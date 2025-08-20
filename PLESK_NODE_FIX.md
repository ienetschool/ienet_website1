# PLESK NODE.JS STARTUP FIX

The error shows Plesk can't start your Node.js application. Let me create a simplified solution.

## Problem: 
Plesk Node.js application failing to start, showing "something went wrong" error.

## Solution:
Change startup approach to use simpler configuration that Plesk can handle.

## New Startup File (index.js in root):
```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', app: 'IeNet React', port: PORT });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`IeNet app running on port ${PORT}`);
});
```

## Package.json (CommonJS instead of ES modules):
```json
{
  "name": "ienet-production",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

This uses CommonJS which is more compatible with Plesk hosting.