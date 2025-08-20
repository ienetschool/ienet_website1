# PRODUCTION DEPLOYMENT GUIDE - MySQL Configuration

## 📦 Package Ready: `ienet-production-mysql-complete.tar.gz`

This contains the complete production-ready deployment with MySQL configuration and comprehensive error handling.

## 🚀 Step-by-Step Production Deployment

### 1. Upload Package to Your Server
```bash
# Download and extract
wget [your-replit-url]/ienet-production-mysql-complete.tar.gz
tar -xzf ienet-production-mysql-complete.tar.gz
cd ienet-production-mysql-complete
```

### 2. Configure MySQL Database
```bash
# Login to MySQL and run setup
mysql -u root -p < setup-mysql-database.sql

# Or manually create:
# - Database: ienet_production
# - User: ienet_user
# - Password: your_mysql_password_here
```

### 3. Configure Environment
Edit `.env.production` with your server details:
```bash
MYSQL_HOST=localhost
MYSQL_USER=ienet_user
MYSQL_PASSWORD=your_actual_mysql_password
MYSQL_DATABASE=ienet_production
MYSQL_PORT=3306
```

### 4. Deploy Application
```bash
# Run deployment script
./deploy.sh

# This will:
# ✅ Install all dependencies
# ✅ Setup database schema
# ✅ Build React application
# ✅ Test database connection
```

### 5. Start Production Server
```bash
npm start
```

## 🔍 Debugging & Monitoring

### Health Check Endpoints:
- **Health Status:** `http://your-domain:5000/api/health`
- **Debug Info:** `http://your-domain:5000/api/debug`
- **Main Site:** `http://your-domain:5000`

### Common Issues & Solutions:

**Database Connection Failed:**
```bash
# Check MySQL service
sudo systemctl status mysql

# Test connection manually
mysql -u ienet_user -p ienet_production
```

**Port Already in Use:**
```bash
# Check what's using port 5000
sudo lsof -i :5000

# Change port in .env.production
PORT=8080
```

**Permission Errors:**
```bash
# Set proper permissions
chmod +x deploy.sh
chmod +x server.js
```

## 📊 What's Included:

### Frontend (React):
- ✅ HeroSlider with all content
- ✅ ModernHeader with navigation
- ✅ About section with company info
- ✅ Services showcase
- ✅ Testimonials section
- ✅ FloatingCTA for engagement
- ✅ All styling and animations

### Backend (Express + MySQL):
- ✅ MySQL database connection
- ✅ All API endpoints
- ✅ Session management
- ✅ Error handling
- ✅ Health monitoring
- ✅ Debug endpoints

### Database (MySQL):
- ✅ Complete schema setup
- ✅ Sample data included
- ✅ Proper indexing
- ✅ UTF8MB4 charset support

## 🎯 Expected Result:
Your production server will run the exact same website as development, with all features working identically, using MySQL instead of PostgreSQL.

## 📞 Support:
If you encounter any issues during deployment, check the debug endpoint first: `http://your-domain:5000/api/debug`