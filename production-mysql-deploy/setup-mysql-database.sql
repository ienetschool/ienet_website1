-- IeNet Production Database Setup
CREATE DATABASE IF NOT EXISTS ienet_production 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Create application user
CREATE USER IF NOT EXISTS 'ienet_user'@'localhost' IDENTIFIED BY 'your_mysql_password_here';
CREATE USER IF NOT EXISTS 'ienet_user'@'%' IDENTIFIED BY 'your_mysql_password_here';

-- Grant permissions
GRANT ALL PRIVILEGES ON ienet_production.* TO 'ienet_user'@'localhost';
GRANT ALL PRIVILEGES ON ienet_production.* TO 'ienet_user'@'%';
FLUSH PRIVILEGES;

-- Use database
USE ienet_production;

-- Verify setup
SELECT 'MySQL Database Setup Complete!' as status;
SHOW TABLES;
