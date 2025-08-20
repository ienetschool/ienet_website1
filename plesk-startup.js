// Simple startup file for Plesk Node.js hosting
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Starting IeNet React Application...');
console.log('Serving from:', join(__dirname, 'public'));

// Serve static files from public directory
app.use(express.static(join(__dirname, 'public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'React App Running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  const indexPath = join(__dirname, 'public', 'index.html');
  console.log(`Serving React app: ${req.url} -> ${indexPath}`);
  res.sendFile(indexPath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ IeNet React Application started successfully`);
  console.log(`🌐 Server running on port ${PORT}`);
  console.log(`📁 Static files served from: ${join(__dirname, 'public')}`);
});