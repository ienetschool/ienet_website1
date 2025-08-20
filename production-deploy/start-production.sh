#!/bin/bash
cd /var/www/ienet.online
npm install --production
NODE_ENV=production node dist/index.js
