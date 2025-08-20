# Deploy React Development Server to Production

## Current Development Server
- Runs on localhost:5000 with Express + Vite
- Shows: TopBar, ModernHeader, HeroSlider, About, Services, Testimonials, FloatingCTA
- Database: Connected to MySQL with 1,328 pages
- All React components working perfectly

## Production Deployment Requirements

### Step 1: Upload Complete Application to Production Server
Upload these folders/files to your production server:
```
/client/          (React frontend)
/server/          (Express backend) 
/shared/          (Shared types/schemas)
/public/          (Static assets)
package.json      (Dependencies)
package-lock.json (Lock file)
vite.config.ts    (Vite configuration)
tsconfig.json     (TypeScript config)
tailwind.config.ts (Styling)
```

### Step 2: Install Node.js Dependencies on Production
```bash
npm install
```

### Step 3: Configure Production Environment
Create `.env.production` with:
```
DATABASE_URL=your_mysql_connection_string
NODE_ENV=production
PORT=3000
```

### Step 4: Build and Start Production Server
```bash
npm run build
npm start
```

### Step 5: Configure Web Server (Apache/Nginx)
Point your domain to the Node.js application running on port 3000.

## Result
Your ienet.online domain will serve the exact same React application as your development server, with all components (HeroSlider, FloatingCTA, etc.) working identically.

NO static HTML files needed - just the React development server running in production mode.