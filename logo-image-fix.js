#!/usr/bin/env node

// Check logo image files and copy them to the public folder
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source logo file
const logoSource = path.join(__dirname, 'attached_assets', 'IE vector logo-01_1755535165852.png');

// Ensure public/images directory exists
const publicImagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

// Copy logo to public/images/logo.png
const logoTarget = path.join(publicImagesDir, 'logo.png');

try {
  if (fs.existsSync(logoSource)) {
    fs.copyFileSync(logoSource, logoTarget);
    console.log('✅ Logo copied successfully to public/images/logo.png');
  } else {
    console.log('❌ Source logo file not found:', logoSource);
  }
} catch (error) {
  console.error('❌ Error copying logo:', error.message);
}