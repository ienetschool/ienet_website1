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
