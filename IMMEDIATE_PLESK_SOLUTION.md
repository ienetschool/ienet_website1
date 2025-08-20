# IMMEDIATE SOLUTION FOR PLESK DEPLOYMENT

## Problem
Static HTML page showing instead of React application on ienet.online

## Direct Solution

### Step 1: Clear Current Files
In Plesk File Manager `/ienet.online/`:
- Delete ALL existing files
- Ensure directory is completely empty

### Step 2: Upload These 3 Files Only

**File 1: index.js**
```javascript
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`IeNet React App running on port ${PORT}`);
});
```

**File 2: package.json**
```json
{
  "name": "ienet-react",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

**File 3: Upload public/ folder** (from clean-react-deploy/public/)

### Step 3: Plesk Configuration
- Application startup file: **index.js**
- Application mode: **production**
- Node.js version: **18.x**

### Step 4: Commands
1. NPM install
2. Restart app

## Result
ienet.online shows React application with HeroSlider, ModernHeader, Services, etc.