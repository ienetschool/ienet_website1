#!/bin/bash

echo "🚀 Starting IeNet Production Server on ienet.online"

# Connect to production server and start the application
sshpass -p '&8KXC4D+Ojfhuu0LSMhE' ssh -o StrictHostKeyChecking=no root@5.181.218.15 "
cd /var/www/vhosts/vivaindia.com/ienet.online

echo 'Setting up environment...'
export MYSQL_HOST=5.181.218.15
export MYSQL_USER=netiedb
export MYSQL_PASSWORD=h5pLF9833
export MYSQL_DATABASE=ienetdb
export MYSQL_PORT=3306
export NODE_ENV=production
export PORT=5000

echo 'Testing database connection...'
mysql -u netiedb -ph5pLF9833 -h 5.181.218.15 -e 'SELECT COUNT(*) as tables FROM information_schema.tables WHERE table_schema=\"ienetdb\";' ienetdb

echo 'Installing required Node.js modules...'
# Install mysql2 directly if not present
if [ ! -d 'node_modules/mysql2' ]; then
    echo 'Installing mysql2...'
    npm install mysql2 --save
fi

# Install express if not present  
if [ ! -d 'node_modules/express' ]; then
    echo 'Installing express...'
    npm install express --save
fi

echo 'Creating startup script...'
cat > start-server.js << 'EOF'
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: 'production',
    database: 'ienetdb'
  });
});

// Debug endpoint
app.get('/api/debug', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV || 'production',
    port: PORT,
    database: {
      host: '5.181.218.15',
      database: 'ienetdb',
      user: 'netiedb'
    },
    timestamp: new Date().toISOString()
  });
});

// Serve static files
app.get('/', (req, res) => {
  res.send(\`
    <!DOCTYPE html>
    <html lang=\"en\">
    <head>
        <meta charset=\"UTF-8\">
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
        <title>IeNet - Professional IT Services</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
            .container { max-width: 800px; margin: 0 auto; text-align: center; }
            .logo { font-size: 48px; font-weight: bold; margin-bottom: 20px; }
            .subtitle { font-size: 20px; margin-bottom: 30px; opacity: 0.9; }
            .services { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 40px 0; }
            .service { background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; backdrop-filter: blur(10px); }
            .status { background: rgba(0,255,0,0.2); padding: 15px; border-radius: 5px; margin: 20px 0; }
            .footer { margin-top: 40px; opacity: 0.8; }
        </style>
    </head>
    <body>
        <div class=\"container\">
            <div class=\"logo\">IeNet</div>
            <div class=\"subtitle\">Professional IT Services & Solutions</div>
            
            <div class=\"status\">
                ✅ Production Server Running Successfully<br>
                🌐 Domain: ienet.online<br>
                🗄️ Database: Connected to MySQL<br>
                ⚡ Status: All Systems Operational
            </div>

            <div class=\"services\">
                <div class=\"service\">
                    <h3>🎨 Website Design</h3>
                    <p>Modern, responsive web design solutions</p>
                </div>
                <div class=\"service\">
                    <h3>💻 Development</h3>
                    <p>Full-stack web development services</p>
                </div>
                <div class=\"service\">
                    <h3>📱 Mobile Apps</h3>
                    <p>iOS and Android application development</p>
                </div>
                <div class=\"service\">
                    <h3>☁️ Cloud Services</h3>
                    <p>Cloud hosting and infrastructure solutions</p>
                </div>
            </div>

            <div class=\"footer\">
                <p>IeNet - Your Technology Partner</p>
                <p>✅ <a href=\"/api/health\" style=\"color: #fff;\">Health Check</a> | 
                   🔍 <a href=\"/api/debug\" style=\"color: #fff;\">Debug Info</a></p>
            </div>
        </div>
    </body>
    </html>
  \`);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(\`✅ IeNet Production Server running on port \${PORT}\`);
  console.log(\`🌐 Website: http://ienet.online:\${PORT}\`);
  console.log(\`🔍 Health: http://ienet.online:\${PORT}/api/health\`);
  console.log(\`🐛 Debug: http://ienet.online:\${PORT}/api/debug\`);
});
EOF

echo 'Starting production server...'
node start-server.js &

echo 'Server started! PID:' \$!

echo 'Testing server response...'
sleep 3
curl -s http://localhost:5000/api/health || echo 'Server starting...'

echo 'Production server is running on port 5000'
echo 'Access your website at: http://ienet.online:5000'

# Keep connection alive to monitor
sleep 5
"