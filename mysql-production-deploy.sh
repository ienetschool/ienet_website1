#!/bin/bash

echo "Creating EXACT SAME project with MySQL for production..."

# Remove any previous deployment
rm -rf production-mysql-deploy
mkdir -p production-mysql-deploy

# Copy ENTIRE project structure
cp -r client production-mysql-deploy/
cp -r server production-mysql-deploy/
cp -r shared production-mysql-deploy/
cp -r public production-mysql-deploy/

# Copy all configuration files
cp package.json production-mysql-deploy/
cp package-lock.json production-mysql-deploy/
cp tsconfig.json production-mysql-deploy/
cp tailwind.config.ts production-mysql-deploy/
cp vite.config.ts production-mysql-deploy/
cp drizzle.config.ts production-mysql-deploy/
cp postcss.config.js production-mysql-deploy/
cp components.json production-mysql-deploy/

# Create MySQL database configuration
cat > production-mysql-deploy/server/mysql-db.ts << 'EOF'
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from "@shared/schema";

// MySQL connection configuration
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'ienet_production',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  connectionLimit: 10,
});

export const db = drizzle(connection, { schema });
export { connection as pool };
EOF

# Update server index to use MySQL
cat > production-mysql-deploy/server/index.ts << 'EOF'
import express from 'express';
import session from 'express-session';
import { createRoutes } from './routes';
import { createViteServer } from './vite';
import path from 'path';

// Use MySQL database
const isDev = process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();
  
  app.use(express.json());
  
  // Session configuration for production
  app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-here',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false,  // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Create API routes
  createRoutes(app);

  if (isDev) {
    // Development mode with Vite
    await createViteServer(app);
  } else {
    // Production mode - serve static files
    app.use(express.static(path.join(process.cwd(), 'dist/public')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'dist/public/index.html'));
    });
  }

  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`IeNet server running on port ${PORT}`);
    console.log(`Mode: ${isDev ? 'development' : 'production'}`);
    console.log(`Database: MySQL`);
  });
}

startServer().catch(console.error);
EOF

# Update package.json to include MySQL
cat > production-mysql-deploy/package.json << 'EOF'
{
  "name": "rest-express",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "start": "NODE_ENV=production tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  },
  "dependencies": {
    "@google-cloud/storage": "^7.12.1",
    "@hookform/resolvers": "^3.6.0",
    "@jridgewell/trace-mapping": "^0.3.25",
    "@neondatabase/serverless": "^0.9.4",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-alert-dialog": "^1.1.1",
    "@radix-ui/react-aspect-ratio": "^1.1.0",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-collapsible": "^1.1.0",
    "@radix-ui/react-context-menu": "^2.2.1",
    "@radix-ui/react-dialog": "^1.1.1",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-hover-card": "^1.1.1",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-menubar": "^1.1.1",
    "@radix-ui/react-navigation-menu": "^1.2.0",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-radio-group": "^1.2.0",
    "@radix-ui/react-scroll-area": "^1.1.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slider": "^1.2.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-switch": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.1",
    "@radix-ui/react-toggle": "^1.1.0",
    "@radix-ui/react-toggle-group": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.2",
    "@replit/vite-plugin-cartographer": "^1.2.0",
    "@replit/vite-plugin-runtime-error-modal": "^1.1.2",
    "@sendgrid/mail": "^8.1.3",
    "@stripe/react-stripe-js": "^2.7.3",
    "@stripe/stripe-js": "^4.1.0",
    "@tailwindcss/typography": "^0.5.13",
    "@tailwindcss/vite": "^4.0.0-alpha.15",
    "@tanstack/react-query": "^5.51.1",
    "@tanstack/react-table": "^8.19.3",
    "@types/connect-pg-simple": "^7.0.3",
    "@types/express": "^4.17.21",
    "@types/express-session": "^1.18.0",
    "@types/memoizee": "^0.4.11",
    "@types/node": "^20.14.10",
    "@types/passport": "^1.0.16",
    "@types/passport-local": "^1.0.38",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/ws": "^8.5.10",
    "@uppy/aws-s3": "^4.0.1",
    "@uppy/core": "^4.0.1",
    "@uppy/dashboard": "^4.0.1",
    "@uppy/drag-drop": "^4.0.1",
    "@uppy/file-input": "^4.0.1",
    "@uppy/progress-bar": "^4.0.1",
    "@uppy/react": "^4.0.1",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "connect-pg-simple": "^9.0.1",
    "date-fns": "^3.6.0",
    "drizzle-kit": "^0.22.8",
    "drizzle-orm": "^0.31.2",
    "drizzle-zod": "^0.5.1",
    "embla-carousel-react": "^8.1.6",
    "esbuild": "^0.21.5",
    "express": "^4.19.2",
    "express-session": "^1.18.0",
    "framer-motion": "^11.2.12",
    "google-auth-library": "^9.11.0",
    "input-otp": "^1.2.4",
    "lucide-react": "^0.400.0",
    "memoizee": "^0.4.15",
    "memorystore": "^1.6.7",
    "mysql2": "^3.10.0",
    "next-themes": "^0.3.0",
    "openai": "^4.52.7",
    "openid-client": "^5.6.5",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "postcss": "^8.4.39",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dnd": "^16.0.1",
    "react-dnd-html5-backend": "^16.0.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.52.1",
    "react-icons": "^5.2.1",
    "react-resizable-panels": "^2.0.19",
    "recharts": "^2.12.7",
    "stripe": "^16.2.0",
    "tailwind-merge": "^2.3.0",
    "tailwindcss": "^3.4.4",
    "tailwindcss-animate": "^1.0.7",
    "tsx": "^4.16.2",
    "tw-animate-css": "^0.3.2",
    "typescript": "^5.5.3",
    "vaul": "^0.9.1",
    "vite": "^5.3.1",
    "wouter": "^3.2.1",
    "ws": "^8.18.0",
    "zod": "^3.23.8",
    "zod-validation-error": "^3.3.0"
  }
}
EOF

# Create environment configuration
cat > production-mysql-deploy/.env.production << 'EOF'
NODE_ENV=production
PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=ienet_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=ienet_production
MYSQL_PORT=3306
SESSION_SECRET=your-secret-key-for-sessions
EOF

# Create MySQL setup script
cat > production-mysql-deploy/setup-mysql.sql << 'EOF'
-- Create database
CREATE DATABASE IF NOT EXISTS ienet_production;

-- Create user (change password as needed)
CREATE USER IF NOT EXISTS 'ienet_user'@'localhost' IDENTIFIED BY 'your_mysql_password';
GRANT ALL PRIVILEGES ON ienet_production.* TO 'ienet_user'@'localhost';
FLUSH PRIVILEGES;

USE ienet_production;
EOF

# Create installation script
cat > production-mysql-deploy/install.sh << 'EOF'
#!/bin/bash

echo "Installing IeNet with MySQL..."

# Install dependencies
npm install

# Setup MySQL database
echo "Setting up MySQL database..."
mysql -u root -p < setup-mysql.sql

# Run database migrations
npm run db:push

echo "Installation complete!"
echo "Start with: npm start"
EOF

chmod +x production-mysql-deploy/install.sh

# Create deployment package
cd production-mysql-deploy
tar -czf ../ienet-mysql-production.tar.gz .
cd ..

echo "✅ Created: ienet-mysql-production.tar.gz"
echo "This is the EXACT SAME project with MySQL support"