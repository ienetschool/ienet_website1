import type { Express, RequestHandler } from "express";
import { storage } from "./storage";

// Simple session-based authentication for development
interface AuthSession {
  userId?: string;
  user?: any;
}

declare global {
  namespace Express {
    interface Request {
      session: AuthSession & { save: (callback: (err?: any) => void) => void };
    }
  }
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  if (req.session?.userId) {
    const user = await storage.getUser(req.session.userId);
    if (user) {
      req.session.user = user;
      return next();
    }
  }
  return res.status(401).json({ message: "Unauthorized" });
};

export function setupSimpleAuth(app: Express) {
  // Simple login route for development
  app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    
    // For demo purposes, create admin user if it doesn't exist
    let user = await storage.getUserByUsername(username);
    if (!user && username === 'admin') {
      user = await storage.createUser({
        id: 'admin-001',
        email: 'admin@ienet.com',
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        password: 'admin123' // In production, this should be hashed
      });
    }
    
    if (user && (password === 'admin123' || password === user.password)) {
      req.session.userId = user.id;
      req.session.user = user;
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).json({ message: 'Login failed' });
        }
        res.json({ user, message: 'Login successful' });
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

  // Get current user
  app.get('/api/auth/user', async (req, res) => {
    if (req.session?.userId) {
      const user = await storage.getUser(req.session.userId);
      if (user) {
        return res.json(user);
      }
    }
    res.status(401).json({ message: 'Unauthorized' });
  });

  // Logout
  app.post('/api/auth/logout', (req, res) => {
    req.session.userId = undefined;
    req.session.user = undefined;
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
      }
      res.json({ message: 'Logout successful' });
    });
  });

  // Simple login page
  app.get('/api/login', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>IeNet Admin Login</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 400px; margin: 100px auto; padding: 20px; }
          .form-group { margin-bottom: 15px; }
          label { display: block; margin-bottom: 5px; font-weight: bold; }
          input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
          button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
          button:hover { background: #0056b3; }
          .alert { padding: 10px; margin: 10px 0; border-radius: 4px; }
          .alert-success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; }
          .alert-error { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; }
        </style>
      </head>
      <body>
        <h2>IeNet Admin Login</h2>
        <div id="message"></div>
        <form id="loginForm">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" value="admin" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" value="admin123" required>
          </div>
          <button type="submit">Login</button>
        </form>
        <p><small>Default credentials: admin / admin123</small></p>
        
        <script>
          document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const credentials = Object.fromEntries(formData);
            
            try {
              const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
              });
              
              const data = await response.json();
              
              if (response.ok) {
                document.getElementById('message').innerHTML = 
                  '<div class="alert alert-success">Login successful! Redirecting...</div>';
                setTimeout(() => window.location.href = '/dashboard', 1000);
              } else {
                document.getElementById('message').innerHTML = 
                  '<div class="alert alert-error">' + data.message + '</div>';
              }
            } catch (error) {
              document.getElementById('message').innerHTML = 
                '<div class="alert alert-error">Login failed. Please try again.</div>';
            }
          });
        </script>
      </body>
      </html>
    `);
  });
}