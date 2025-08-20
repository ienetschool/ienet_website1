-- Create database
CREATE DATABASE IF NOT EXISTS ienet_production;

-- Create user (change password as needed)
CREATE USER IF NOT EXISTS 'ienet_user'@'localhost' IDENTIFIED BY 'your_mysql_password';
GRANT ALL PRIVILEGES ON ienet_production.* TO 'ienet_user'@'localhost';
FLUSH PRIVILEGES;

USE ienet_production;
