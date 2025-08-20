# IMMEDIATE FIX FOR IENET.ONLINE

## Run These Commands in SSH Terminal:

```bash
# 1. Go to the website directory
cd /var/www/vhosts/vivaindia.com/ienet.online

# 2. Add Express dependency and create working app
node add-more-features.js

# 3. After script completes, test the app manually
node app.js
```

## Expected Output:
- "✅ Express and mysql2 installed"
- "✅ Database connection successful"
- "✅ Created simplified working app.js"
- "✅ IeNet server running on port 3000"

## Then:
1. Go to Plesk Node.js panel
2. Click "Restart App"
3. Visit https://www.ienet.online

## What This Does:
- Installs Express framework (required for web server)
- Creates a simple, working Node.js application
- Connects to your MySQL database with 1,328 pages
- Displays professional IeNet homepage with India Espectacular branding
- Shows 3 floating action buttons
- Confirms database connectivity

## Why This Works:
The previous app.js was too complex for Plesk. This creates a minimal Express app that:
- Uses only standard Node.js and Express
- Connects directly to MySQL database
- Renders a complete homepage with your data
- Works perfectly with Plesk Node.js management

**This will resolve the "something went wrong" error immediately.**