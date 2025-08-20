-- Create database for IeNet production
CREATE DATABASE IF NOT EXISTS ienet_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user for the application
CREATE USER IF NOT EXISTS 'ienet_user'@'localhost' IDENTIFIED BY 'your_mysql_password';
CREATE USER IF NOT EXISTS 'ienet_user'@'%' IDENTIFIED BY 'your_mysql_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON ienet_production.* TO 'ienet_user'@'localhost';
GRANT ALL PRIVILEGES ON ienet_production.* TO 'ienet_user'@'%';
FLUSH PRIVILEGES;

-- Use the database
USE ienet_production;

-- Show that database is ready
SELECT 'Database ienet_production is ready!' as status;
