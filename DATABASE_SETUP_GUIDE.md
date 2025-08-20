# MySQL Database Setup Guide

## Check and Configure Database

I've created `setup-mysql-database.js` to check your database status and configure it properly.

### Upload and Run Setup Script

1. **Upload `setup-mysql-database.js` to your server**

2. **Install mysql2 dependency:**
   ```bash
   ssh root@5.181.218.15
   cd /var/www/vhosts/vivaindia.com/ienet.online/
   npm install mysql2
   ```

3. **Run the database setup:**
   ```bash
   node setup-mysql-database.js
   ```

### What the Script Does

✅ **Connection Test** - Verifies connection to your MySQL database  
✅ **Table Creation** - Creates required tables if they don't exist:
- `service_categories`
- `services` 
- `features`
- `projects`

✅ **Data Check** - Shows how many records exist in each table  
✅ **Sample Data** - Inserts sample data if tables are empty  
✅ **Status Report** - Final summary of database state  

### Expected Output

```
🔌 Connecting to MySQL database...
✅ Connected successfully!
📊 Checking database status...
Found 0 tables: []
🔨 Creating tables...
✅ service_categories table ready
✅ services table ready  
✅ features table ready
✅ projects table ready
🌱 Inserting sample service categories...
✅ Service categories inserted
🎉 Database setup completed successfully!
```

### After Setup Complete

1. **Update Node.js app** to use `mysql-production-server.cjs`
2. **Restart** the Node.js application in Plesk
3. **Test** the API: `curl https://www.ienet.online/api/service-categories`

### Troubleshooting

If connection fails, the script will show specific error messages and solutions for:
- Connection refused errors
- Authentication errors  
- Permission issues

This script gives you complete visibility into your database setup and ensures everything is configured correctly for your production server.