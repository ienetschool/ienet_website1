-- IeNet Database Backup (MySQL Format)
-- Created for: ienet.online
-- Database: MySQL/MariaDB (Host: 5.181.218.15:3306)
-- Generated: 2025-08-19T23:52:55.467Z

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Table structure for table `service_categories`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `service_categories`;
CREATE TABLE `service_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text,
  `icon` varchar(255),
  `color` varchar(50),
  `meta_title` varchar(255),
  `meta_description` text,
  `is_active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `service_categories`
INSERT INTO `service_categories` (`id`, `name`, `slug`, `description`, `icon`, `color`, `meta_title`, `meta_description`, `is_active`, `sort_order`) VALUES
(11, 'Website Design & Development', 'website-design-development', 'Professional website design and development services', 'globe', '#3B82F6', 'Website Design & Development | India Espectacular', 'Professional website design and development services by India Espectacular', 1, 1),
(12, 'Mobile App Development', 'mobile-app-development', 'iOS and Android mobile application development', 'smartphone', '#10B981', 'Mobile App Development | India Espectacular', 'iOS and Android mobile application development services', 1, 2),
(13, 'E-commerce Solutions', 'ecommerce-solutions', 'Complete e-commerce platform development', 'shopping-cart', '#F59E0B', 'E-commerce Solutions | India Espectacular', 'Complete e-commerce platform development services', 1, 3),
(14, 'Digital Marketing', 'digital-marketing', 'SEO, social media, and online marketing services', 'trending-up', '#EF4444', 'Digital Marketing | India Espectacular', 'SEO, social media, and online marketing services', 1, 4),
(15, 'Cloud Services', 'cloud-services', 'Cloud hosting and infrastructure solutions', 'cloud', '#8B5CF6', 'Cloud Services | India Espectacular', 'Cloud hosting and infrastructure solutions', 1, 5),
(16, 'Cybersecurity Solutions', 'cybersecurity-solutions', 'Security audits and protection services', 'shield', '#06B6D4', 'Cybersecurity Solutions | India Espectacular', 'Security audits and protection services', 1, 6),
(17, 'AI & Machine Learning', 'ai-machine-learning', 'Artificial intelligence and ML solutions', 'brain', '#EC4899', 'AI & Machine Learning | India Espectacular', 'Artificial intelligence and ML solutions', 1, 7),
(18, 'DevOps & Automation', 'devops-automation', 'Development operations and automation', 'settings', '#84CC16', 'DevOps & Automation | India Espectacular', 'Development operations and automation services', 1, 8),
(19, 'Data Analytics', 'data-analytics', 'Business intelligence and data analysis', 'bar-chart', '#F97316', 'Data Analytics | India Espectacular', 'Business intelligence and data analysis services', 1, 9),
(20, 'Consulting Services', 'consulting-services', 'Technology consulting and strategy', 'users', '#6366F1', 'Consulting Services | India Espectacular', 'Technology consulting and strategy services', 1, 10);

-- --------------------------------------------------------
-- Table structure for table `services`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text,
  `short_description` varchar(500),
  `price_range` varchar(100),
  `duration` varchar(100),
  `is_active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `service_categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `features`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `features`;
CREATE TABLE `features` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2),
  `is_active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `features_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `projects`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text,
  `short_description` varchar(500),
  `content` text,
  `image_url` varchar(255),
  `demo_url` varchar(255),
  `technologies` json,
  `category` varchar(255),
  `client_name` varchar(255),
  `completion_date` date,
  `meta_title` varchar(255),
  `meta_description` text,
  `is_featured` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `projects`
INSERT INTO `projects` (`id`, `title`, `slug`, `description`, `short_description`, `content`, `image_url`, `demo_url`, `technologies`, `category`, `client_name`, `completion_date`, `meta_title`, `meta_description`, `is_featured`, `is_active`, `sort_order`) VALUES
(1, 'E-commerce Platform Redesign', 'ecommerce-platform-redesign', 'Complete redesign of e-commerce platform with modern UI/UX and enhanced user experience', 'Modern e-commerce platform with enhanced UX', 'This comprehensive e-commerce platform features modern design, responsive layout, advanced payment integration, and optimized performance for better user engagement.', '/images/projects/ecommerce.jpg', 'https://example-ecommerce.com', '["React", "Node.js", "MongoDB", "Stripe"]', 'E-commerce', 'TechCorp Inc.', '2024-12-15', 'E-commerce Platform Redesign | India Espectacular', 'Complete redesign of e-commerce platform with modern UI/UX by India Espectacular', 1, 1, 1),
(2, 'Healthcare Management System', 'healthcare-management-system', 'Comprehensive healthcare management solution with patient portal and analytics', 'Healthcare management with patient portal', 'Advanced healthcare management system featuring patient portals, appointment scheduling, medical records management, and comprehensive analytics dashboard.', '/images/projects/healthcare.jpg', 'https://healthcare-demo.com', '["Vue.js", "Python", "PostgreSQL", "Docker"]', 'Healthcare', 'HealthCare Solutions', '2024-11-20', 'Healthcare Management System | India Espectacular', 'Comprehensive healthcare management solution with patient portal and analytics', 1, 1, 2),
(3, 'Mobile Banking App', 'mobile-banking-app', 'Secure mobile banking application for iOS and Android with advanced security features', 'Secure mobile banking application', 'Feature-rich mobile banking application with biometric authentication, real-time transactions, budget tracking, and enterprise-grade security measures.', '/images/projects/banking.jpg', 'https://securebank-app.com', '["React Native", "Node.js", "MongoDB", "AWS"]', 'Mobile App', 'SecureBank Ltd.', '2024-10-10', 'Mobile Banking App | India Espectacular', 'Secure mobile banking application for iOS and Android with advanced security features', 1, 1, 3);

-- --------------------------------------------------------
-- Table structure for table `testimonials`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `position` varchar(255),
  `company` varchar(255),
  `quote` text NOT NULL,
  `avatar` varchar(255),
  `rating` int(1) DEFAULT 5,
  `is_active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `testimonials`
INSERT INTO `testimonials` (`id`, `name`, `position`, `company`, `quote`, `avatar`, `rating`, `is_active`, `sort_order`) VALUES
(1, 'Sarah Johnson', 'CEO', 'TechStartup Inc.', 'India Espectacular delivered exceptional results for our web development project. Their team is professional, responsive, and truly understands modern web technologies.', '/images/testimonials/sarah.jpg', 5, 1, 1),
(2, 'Michael Chen', 'CTO', 'Digital Solutions Ltd.', 'Outstanding work on our e-commerce platform. The team at India Espectacular exceeded our expectations with their innovative approach and attention to detail.', '/images/testimonials/michael.jpg', 5, 1, 2);

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255),
  `role` enum('admin','editor','user') DEFAULT 'user',
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `enquiries`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `enquiries`;
CREATE TABLE `enquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20),
  `company` varchar(255),
  `service_type` varchar(255),
  `message` text NOT NULL,
  `status` enum('new','in_progress','completed','cancelled') DEFAULT 'new',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `site_settings`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` text,
  `type` enum('text','number','boolean','json') DEFAULT 'text',
  `description` varchar(500),
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for table `site_settings`
INSERT INTO `site_settings` (`key`, `value`, `type`, `description`) VALUES
('site_name', 'India Espectacular', 'text', 'Website name'),
('site_description', 'Professional IT Services and Solutions', 'text', 'Site description'),
('contact_email', 'info.indiaespectacular@gmail.com', 'text', 'Contact email address'),
('contact_phone', '+91-9876543210', 'text', 'Contact phone number'),
('address', 'Mumbai, Maharashtra, India', 'text', 'Business address'),
('social_facebook', 'https://facebook.com/IndiaEspectacular', 'text', 'Facebook URL'),
('social_twitter', 'https://twitter.com/IndiaEspectacular', 'text', 'Twitter URL'),
('social_linkedin', 'https://linkedin.com/company/IndiaEspectacular', 'text', 'LinkedIn URL');

SET FOREIGN_KEY_CHECKS=1;
COMMIT;

-- --------------------------------------------------------
-- Migration Complete
-- --------------------------------------------------------
-- This MySQL backup is ready for import to: ienet.online
-- Database: ienetdb (Host: 5.181.218.15:3306)
-- User: netiedb
-- 
-- Import Instructions:
-- 1. mysql -h 5.181.218.15 -u netiedb -p ienetdb < ienet-mysql-backup-complete.sql
-- 2. Verify tables: SHOW TABLES;
-- 3. Check data: SELECT COUNT(*) FROM service_categories;
-- --------------------------------------------------------
