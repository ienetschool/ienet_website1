const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Starting IeNet React Application...');
console.log('Node.js version:', process.version);
console.log('Environment:', process.env.NODE_ENV || 'development');

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    app: 'IeNet React Application',
    timestamp: new Date().toISOString(),
    port: PORT,
    node_version: process.version
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({ 
    message: 'IeNet API is running',
    timestamp: new Date().toISOString()
  });
});

// Serve React application for all other routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  console.log(`Serving React app: ${req.url} -> ${indexPath}`);
  res.sendFile(indexPath);
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ IeNet React Application started successfully`);
  console.log(`🌐 Server running on port ${PORT}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, 'public')}`);
  console.log(`🚀 Visit http://ienet.online to view your website`);
});