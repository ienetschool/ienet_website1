const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Starting IeNet Production Server...');
console.log('Serving from dist directory...');

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    app: 'IeNet Production',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Serve main app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`IeNet Production Server running on port ${PORT}`);
  console.log('Visit http://localhost:' + PORT);
});