# India Espectacular - Installation & Deployment Guide

## Quick Start (Production Ready)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Complete Setup
```bash
node single-click-setup.js
```

### 3. Start Production Server
```bash
npm run dev
```

## Database Configuration

### MySQL Production Database
- **Host:** 5.181.218.15:3306
- **Database:** ienetdb
- **User:** netiedb
- **Tables:** 41 complete tables
- **Data:** 1,328 pages (25 categories + 143 services + 1,160 features)

### Verification Commands
```bash
# Verify database connection
node test-mysql-connection.js

# Check all tables and data
node single-click-setup.js

# Create database backup
node create-mysql-backup.js
```

## Content Structure

### Service Hierarchy
1. **Service Categories (25)**: Main service pages
2. **Services (143)**: Detailed service offerings
3. **Features (1,160)**: Individual feature pages
4. **Additional Content**: Projects, testimonials, pages

### Database Tables (41 Total)
- Core: service_categories, services, features
- Content: pages, blog_posts, projects
- Business: enquiries, quotes, orders, payments
- System: users, roles, sessions, settings
- Analytics: analytics, activity_logs, backups
- Marketing: testimonials, sliders, email_queue

## Domain Configuration

### Production Domain: ienet.online
- MySQL database configured
- Production settings applied
- SSL ready configuration
- All tables populated with data

## Deployment Commands

### Local Development
```bash
npm run dev          # Start development server
```

### Production Deployment
```bash
npm install          # Install dependencies
npm run build        # Build for production (if applicable)
npm start           # Start production server
```

## File Structure

```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared types and schemas
├── production-config.json    # Production configuration
├── DEPLOYMENT_STATUS.md     # Deployment verification
└── package.json     # Dependencies and scripts
```

## Environment Variables

```bash
# Database (MySQL Production)
DATABASE_URL=mysql://netiedb:h5pLF9833@5.181.218.15:3306/ienetdb
NODE_ENV=production
PORT=5000

# Domain
DOMAIN=ienet.online
```

## Verification Checklist

- ✅ MySQL database connected
- ✅ All 41 tables created
- ✅ 1,328 content pages populated
- ✅ Production configuration applied
- ✅ Domain settings configured
- ✅ Ready for live deployment

## Support

For technical support or deployment assistance:
- Check DEPLOYMENT_STATUS.md for current status
- Run verification scripts to diagnose issues
- Review MySQL connection settings

---

**Status:** Production Ready | **Last Updated:** ${new Date().toISOString()}