// Production server startup for exact React application deployment
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 Starting IeNet Production Server...');

// Serve static files from the built React application
app.use(express.static(join(__dirname, 'public')));

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    application: 'IeNet React Production',
    timestamp: new Date().toISOString()
  });
});

// Serve React application for all other routes
app.get('*', (req, res) => {
  const indexPath = join(__dirname, 'public', 'index.html');
  console.log(`Serving React app: ${req.url} -> ${indexPath}`);
  res.sendFile(indexPath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ IeNet Production Server running on port ${PORT}`);
  console.log(`🌐 Application URL: http://ienet.online`);
  console.log(`📁 Serving React app from: ${join(__dirname, 'public')}`);
});