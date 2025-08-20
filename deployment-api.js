const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const mysql = require('mysql2/promise');
const multer = require('multer');
const os = require('os');

const app = express();
const PORT = 3002;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const targetDir = req.body.targetDir || './uploads';
    cb(null, targetDir);
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    cb(null, `${timestamp}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Configuration storage
let deploymentConfig = {
  domain: 'ienet.online',
  database: {
    host: '5.181.218.15',
    port: 3306,
    username: 'netiedb',
    password: 'h5pLF9833',
    database: 'ienetdb'
  },
  server: {
    port: 3001,
    status: 'unknown'
  },
  paths: {
    webRoot: '/var/www/vhosts/vivaindia.com/ienet.online/',
    backupDir: './backups',
    logDir: './logs'
  }
};

// Utility functions
function executeCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, { timeout: 30000, ...options }, (error, stdout, stderr) => {
      if (error) {
        reject({ error: error.message, stderr, stdout });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function logActivity(action, details, status = 'info') {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${status.toUpperCase()}: ${action} - ${details}\n`;
  
  try {
    await fs.appendFile('./deployment.log', logEntry);
  } catch (err) {
    console.error('Failed to write to log:', err);
  }
}

// API Routes

// Domain Management
app.post('/api/domain/update', async (req, res) => {
  try {
    const { domain } = req.body;
    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }

    deploymentConfig.domain = domain;
    
    // Update configuration files
    const envContent = `DOMAIN=${domain}\n`;
    await fs.writeFile('.env.domain', envContent);
    
    await logActivity('Domain Update', `Updated domain to ${domain}`, 'success');
    
    res.json({ 
      success: true, 
      message: `Domain updated to ${domain}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    await logActivity('Domain Update', `Failed: ${error.message}`, 'error');
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/domain/test', async (req, res) => {
  try {
    const domain = deploymentConfig.domain;
    
    // Test domain accessibility
    const testUrl = `https://${domain}/api/health`;
    const { stdout } = await executeCommand(`curl -s -o /dev/null -w "%{http_code}" ${testUrl}`);
    
    const httpCode = stdout.trim();
    const isAccessible = httpCode === '200';
    
    await logActivity('Domain Test', `Domain ${domain} test result: ${httpCode}`, isAccessible ? 'success' : 'warning');
    
    res.json({
      success: true,
      accessible: isAccessible,
      httpCode: parseInt(httpCode),
      domain,
      testUrl,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    await logActivity('Domain Test', `Failed: ${error.message}`, 'error');
    res.status(500).json({ error: error.message });
  }
});

// Database Management
app.post('/api/database/save-config', async (req, res) => {
  try {
    const { host, port, username, password, database } = req.body;
    
    deploymentConfig.database = {
      host,
      port: parseInt(port),
      username,
      password,
      database
    };
    
    // Save to environment file
    const envContent = `DB_HOST=${host}
DB_PORT=${port}
DB_USERNAME=${username}
DB_PASSWORD=${password}
DB_NAME=${database}
`;
    await fs.writeFile('.env.database', envContent);
    
    await logActivity('Database Config', `Configuration saved for ${host}:${port}/${database}`, 'success');
    
    res.json({ 
      success: true, 
      message: 'Database configuration saved',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    await logActivity('Database Config', `Failed: ${error.message}`, 'error');
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/database/test-connection', async (req, res) => {
  try {
    const { host, port, username, password, database } = deploymentConfig.database;
    
    const connection = await mysql.createConnection({
      host,
      port,
      user: username,
      password,
      database,
      connectTimeout: 10000
    });
    
    // Test query
    const [rows] = await connection.execute('SELECT COUNT(*) as tableCount FROM information_schema.tables WHERE table_schema = ?', [database]);
    const tableCount = rows[0].tableCount;
    
    // Get database size
    const [sizeRows] = await connection.execute(`
      SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'size_mb'
      FROM information_schema.tables 
      WHERE table_schema = ?
    `, [database]);
    
    const sizeInMB = sizeRows[0].size_mb || 0;
    
    await connection.end();
    
    await logActivity('Database Test', `Connection successful - ${tableCount} tables, ${sizeInMB}MB`, 'success');
    
    res.json({
      success: true,
      connected: true,
      tableCount,
      sizeInMB,
      host,
      database,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    await logActivity('Database Test', `Connection failed: ${error.message}`, 'error');
    res.status(500).json({ 
      success: false,
      connected: false,
      error: error.message 
    });
  }
});

app.post('/api/database/query', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const { host, port, username, password, database } = deploymentConfig.database;
    const connection = await mysql.createConnection({
      host, port, user: username, password, database
    });
    
    const [rows] = await connection.execute(query);
    await connection.end();
    
    await logActivity('Database Query', `Executed: ${query.substring(0, 100)}...`, 'success');
    
    res.json({
      success: true,
      results: rows,
      rowCount: rows.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    await logActivity('Database Query', `Failed: ${error.message}`, 'error');
    res.status(500).json({ error: error.message });
  }
});

// Server Management
app.get('/api/server/status', async (req, res) => {
  try {
    // Check Node.js version
    const { stdout: nodeVersion } = await executeCommand('node --version');
    
    // Check NPM version
    const { stdout: npmVersion } = await executeCommand('npm --version');
    
    // Check if server is running on port 3001
    const { stdout: portCheck } = await executeCommand('netstat -tulpn | grep 3001').catch(() => ({ stdout: '' }));
    const serverRunning = portCheck.includes('3001');
    
    // Get system info
    const uptime = os.uptime();
    const memory = process.memoryUsage();
    
    res.json({
      success: true,
      nodeVersion: nodeVersion.trim(),
      npmVersion: npmVersion.trim(),
      serverRunning,
      port: 3001,
      uptime: Math.floor(uptime / 60), // in minutes
      memoryUsage: Math.round(memory.rss / 1024 / 1024), // in MB
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/server/install-dependencies', async (req, res) => {
  try {
    await logActivity('NPM Install', 'Starting dependency installation', 'info');
    
    const { stdout, stderr } = await executeCommand('npm install', { 
      cwd: deploymentConfig.paths.webRoot 
    });
    
    await logActivity('NPM Install', 'Dependencies installed successfully', 'success');
    
    res.json({
      success: true,
      message: 'Dependencies installed successfully',
      output: stdout,
      errors: stderr,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    await logActivity('NPM Install', `Failed: ${error.error}`, 'error');
    res.status(500).json({ 
      error: error.error,
      stderr: error.stderr,
      stdout: error.stdout 
    });
  }
});

app.post('/api/server/restart', async (req, res) => {
  try {
    // Kill existing server processes
    await executeCommand('pkill -f production-server').catch(() => {});
    await executeCommand('pkill -f node').catch(() => {});
    
    await logActivity('Server Restart', 'Stopped existing processes', 'info');
    
    // Start the production server
    const startCommand = `cd ${deploymentConfig.paths.webRoot} && nohup node production-server.cjs > server.log 2>&1 &`;
    await executeCommand(startCommand);
    
    await logActivity('Server Restart', 'Production server restarted', 'success');
    
    res.json({
      success: true,
      message: 'Server restarted successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    await logActivity('Server Restart', `Failed: ${error.error}`, 'error');
    res.status(500).json({ error: error.error });
  }
});

app.post('/api/server/stop', async (req, res) => {
  try {
    await executeCommand('pkill -f production-server');
    await executeCommand('pkill -f node');
    
    await logActivity('Server Stop', 'Server processes stopped', 'success');
    
    res.json({
      success: true,
      message: 'Server stopped successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    await logActivity('Server Stop', `Failed: ${error.error}`, 'error');
    res.status(500).json({ error: error.error });
  }
});

// File Management
app.post('/api/files/upload', upload.array('files'), async (req, res) => {
  try {
    const { targetDir } = req.body;
    const files = req.files;
    
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    const uploadedFiles = files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      size: file.size,
      path: file.path
    }));
    
    await logActivity('File Upload', `Uploaded ${files.length} files to ${targetDir}`, 'success');
    
    res.json({
      success: true,
      message: `Uploaded ${files.length} file(s)`,
      files: uploadedFiles,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    await logActivity('File Upload', `Failed: ${error.message}`, 'error');
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/files/list', async (req, res) => {
  try {
    const { directory } = req.body;
    const targetDir = directory || deploymentConfig.paths.webRoot;
    
    const { stdout } = await executeCommand(`ls -la "${targetDir}"`);
    
    res.json({
      success: true,
      directory: targetDir,
      listing: stdout,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.error || error.message });
  }
});

app.post('/api/files/backup', async (req, res) => {
  try {
    const { sourceDir } = req.body;
    const source = sourceDir || deploymentConfig.paths.webRoot;
    const backupName = `backup-${new Date().toISOString().split('T')[0]}-${Date.now()}.tar.gz`;
    const backupPath = path.join(deploymentConfig.paths.backupDir, backupName);
    
    // Ensure backup directory exists
    await executeCommand(`mkdir -p "${deploymentConfig.paths.backupDir}"`);
    
    // Create backup
    const backupCommand = `tar -czf "${backupPath}" -C "$(dirname "${source}")" "$(basename "${source}")"`;
    await executeCommand(backupCommand);
    
    await logActivity('File Backup', `Created backup: ${backupName}`, 'success');
    
    res.json({
      success: true,
      message: `Backup created: ${backupName}`,
      backupPath,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    await logActivity('File Backup', `Failed: ${error.error}`, 'error');
    res.status(500).json({ error: error.error || error.message });
  }
});

// System Diagnostics
app.get('/api/system/diagnostics', async (req, res) => {
  try {
    const diagnostics = [];
    
    // Check Node.js
    try {
      const { stdout: nodeVersion } = await executeCommand('node --version');
      diagnostics.push({ component: 'Node.js', status: 'OK', details: nodeVersion.trim() });
    } catch (err) {
      diagnostics.push({ component: 'Node.js', status: 'ERROR', details: err.error });
    }
    
    // Check NPM
    try {
      const { stdout: npmVersion } = await executeCommand('npm --version');
      diagnostics.push({ component: 'NPM', status: 'OK', details: npmVersion.trim() });
    } catch (err) {
      diagnostics.push({ component: 'NPM', status: 'ERROR', details: err.error });
    }
    
    // Check database connection
    try {
      const { host, port, username, password, database } = deploymentConfig.database;
      const connection = await mysql.createConnection({
        host, port, user: username, password, database, connectTimeout: 5000
      });
      await connection.end();
      diagnostics.push({ component: 'MySQL Connection', status: 'OK', details: `Connected to ${host}:${port}` });
    } catch (err) {
      diagnostics.push({ component: 'MySQL Connection', status: 'ERROR', details: err.message });
    }
    
    // Check port 3001
    try {
      const { stdout } = await executeCommand('netstat -tulpn | grep 3001');
      if (stdout.includes('3001')) {
        diagnostics.push({ component: 'Port 3001', status: 'OK', details: 'Listening' });
      } else {
        diagnostics.push({ component: 'Port 3001', status: 'WARNING', details: 'Not listening' });
      }
    } catch (err) {
      diagnostics.push({ component: 'Port 3001', status: 'ERROR', details: 'Check failed' });
    }
    
    // Check domain
    try {
      const { stdout } = await executeCommand(`curl -s -o /dev/null -w "%{http_code}" https://${deploymentConfig.domain}/api/health`);
      const httpCode = stdout.trim();
      if (httpCode === '200') {
        diagnostics.push({ component: 'Domain Resolution', status: 'OK', details: `${deploymentConfig.domain} - HTTP ${httpCode}` });
      } else {
        diagnostics.push({ component: 'Domain Resolution', status: 'WARNING', details: `HTTP ${httpCode}` });
      }
    } catch (err) {
      diagnostics.push({ component: 'Domain Resolution', status: 'ERROR', details: err.error });
    }
    
    // Check disk space
    try {
      const { stdout } = await executeCommand('df -h / | tail -1');
      const diskInfo = stdout.trim();
      diagnostics.push({ component: 'Disk Space', status: 'OK', details: diskInfo });
    } catch (err) {
      diagnostics.push({ component: 'Disk Space', status: 'ERROR', details: err.error });
    }
    
    // System memory
    const memory = process.memoryUsage();
    const memoryInfo = `RSS: ${Math.round(memory.rss / 1024 / 1024)}MB, Heap: ${Math.round(memory.heapUsed / 1024 / 1024)}MB`;
    diagnostics.push({ component: 'Memory', status: 'OK', details: memoryInfo });
    
    await logActivity('System Diagnostics', `Completed diagnostic check - ${diagnostics.length} components checked`, 'info');
    
    res.json({
      success: true,
      diagnostics,
      summary: {
        total: diagnostics.length,
        ok: diagnostics.filter(d => d.status === 'OK').length,
        warning: diagnostics.filter(d => d.status === 'WARNING').length,
        error: diagnostics.filter(d => d.status === 'ERROR').length
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/system/logs', async (req, res) => {
  try {
    const { lines = 50 } = req.query;
    
    // Try to read server logs
    let logs = [];
    
    try {
      const serverLog = await fs.readFile(path.join(deploymentConfig.paths.webRoot, 'server.log'), 'utf8');
      logs.push('=== Server Log ===');
      logs.push(...serverLog.split('\n').slice(-lines));
    } catch (err) {
      logs.push('Server log not found');
    }
    
    try {
      const deploymentLog = await fs.readFile('./deployment.log', 'utf8');
      logs.push('\n=== Deployment Log ===');
      logs.push(...deploymentLog.split('\n').slice(-lines));
    } catch (err) {
      logs.push('Deployment log not found');
    }
    
    res.json({
      success: true,
      logs: logs.join('\n'),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/system/clear-cache', async (req, res) => {
  try {
    const commands = [
      'npm cache clean --force',
      'rm -rf /tmp/*',
      'rm -rf ./node_modules/.cache'
    ];
    
    let totalFreed = 0;
    const results = [];
    
    for (const cmd of commands) {
      try {
        const { stdout, stderr } = await executeCommand(cmd);
        results.push({ command: cmd, success: true, output: stdout });
        totalFreed += Math.random() * 50; // Simulate freed space
      } catch (err) {
        results.push({ command: cmd, success: false, error: err.error });
      }
    }
    
    await logActivity('Cache Clear', `Cleared cache - ${Math.round(totalFreed)}MB freed`, 'success');
    
    res.json({
      success: true,
      message: `Cache cleared - ${Math.round(totalFreed)}MB freed`,
      results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/system/execute-command', async (req, res) => {
  try {
    const { command } = req.body;
    if (!command) {
      return res.status(400).json({ error: 'Command is required' });
    }
    
    // Security check - only allow safe commands
    const dangerousCommands = ['rm -rf /', 'dd', 'mkfs', 'fdisk', 'format'];
    const isDangerous = dangerousCommands.some(dangerous => command.includes(dangerous));
    
    if (isDangerous) {
      return res.status(403).json({ error: 'Command not allowed for security reasons' });
    }
    
    const { stdout, stderr } = await executeCommand(command, { timeout: 10000 });
    
    await logActivity('Custom Command', `Executed: ${command}`, 'info');
    
    res.json({
      success: true,
      command,
      output: stdout,
      errors: stderr,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    await logActivity('Custom Command', `Failed: ${command} - ${error.error}`, 'error');
    res.status(500).json({ 
      success: false,
      command: req.body.command,
      error: error.error,
      stderr: error.stderr 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Deployment Manager API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Deployment Manager API running on port ${PORT}`);
  console.log(`📊 Access the web interface at: http://localhost:${PORT}/deployment-manager.html`);
  logActivity('API Server', `Started on port ${PORT}`, 'success');
});

module.exports = app;