# STEP-BY-STEP MANUAL FIX FOR PLESK

Your Plesk keeps showing "The file does not exist" because the upload isn't working correctly.

## Manual Solution:

### Step 1: Create Folder Structure in Plesk File Manager
Go to /ienet.online/ and create these folders:
1. Create folder: `dist`
2. Create folder: `public` 
3. Create folder: `public/assets`

### Step 2: Create dist/index.js File
In Plesk File Manager, create new file: `/ienet.online/dist/index.js`
Copy and paste this exact code:

```javascript
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Starting IeNet React Application...');

app.use(express.static(join(__dirname, '..', 'public')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'IeNet React App Running', timestamp: new Date() });
});

app.get('*', (req, res) => {
  const indexPath = join(__dirname, '..', 'public', 'index.html');
  res.sendFile(indexPath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`IeNet React Application started on port ${PORT}`);
  console.log(`Visit http://ienet.online to view your website`);
});
```

### Step 3: Create package.json File
In Plesk File Manager, create new file: `/ienet.online/package.json`
Copy and paste:

```json
{
  "name": "ienet-production",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### Step 4: Upload React Files
Download final-plesk-exact-structure.tar.gz, extract it, and upload:
- All files from `public/` folder to `/ienet.online/public/`

### Step 5: Plesk Configuration
- Keep Application Startup File: `dist/index.js`
- Click "NPM install"
- Click "Restart App"

This will fix the "file does not exist" error.