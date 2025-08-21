## Overview
IeNet is a comprehensive enterprise IT services platform offering extensive solutions across various technology domains. It features a hierarchical service architecture with 15 main categories, over 91 detailed services, and more than 795 feature pages, alongside 10 project showcases. The platform is a modern full-stack web application providing a professional marketing website with detailed service hierarchies and an advanced admin management system for content administration. Its business vision is to deliver efficient enterprise-level IT services through robust content management and a user-friendly interface.

## User Preferences
Preferred communication style: Simple, everyday language.
Technical approach preference: Focus on working solutions rather than extensive debugging of complex issues.
New Request: Built comprehensive web-based deployment configuration tool with domain management, database testing, server control, file management, and system diagnostics - complete single-page interface for production server management.
CRITICAL USER REQUIREMENT - User explicitly stated "keep same development server website at both servers" and "don't messed with code without my permission" and "don't create static website, I don't want it." User wants the exact React development server application running on both development and production environments, NOT separate static versions. User preference: NO static HTML files, NO separate code bases, NO different versions - only the React development server application should run on ienet.online domain. User prefers simple configuration tools over complex server files. User frustrated with overcomplicated solutions when simple file replacement would work.
Latest Request: Create Cancellation & Refund Policy page, update Privacy/Terms pages for Indian law compliance, add India office address to footer/contact page, change Contact page title from "Contact India Espectacular" to "Contact IeNet".

## Recent Progress (August 21, 2025)
✅ DEPLOYMENT BREAKTHROUGH: Successfully deployed React application to https://www.ienet.online with identical code structure
✅ RESOLVED 403 ERRORS: Fixed file permissions and Nginx configuration for proper website loading
✅ STATIC ASSETS WORKING: CSS and JavaScript files loading correctly from /assets/ directory
✅ NODE.JS INSTALLATION: Successfully installed Node.js v24.5.0 through Plesk panel with production configuration
✅ MYSQL DATABASE SETUP: Complete installation script executed successfully with full schema and sample data (41 tables, 25 service categories, 143 services, 1160 features, 3 projects)
✅ PRODUCTION CONFIG: MySQL production server (mysql-production-server.cjs) configured with proper database credentials
✅ DEVELOPMENT SERVER FIXES: All TypeScript compilation errors resolved in Services.tsx, website logo working correctly, all 25 service categories loading with real database data
✅ API STRUCTURE CONFIRMED: Services (143+), Features (1160+), Projects (3) all loading correctly on development server with proper routing and data structure
✅ LOGO RESOLUTION: Fixed logo path issues on both development and production servers, logo files properly deployed
✅ PRODUCTION SERVER FIXED: Successfully deployed exact copy of development server routes to production, created missing service "search-engine-optimization" in database, server restarted and running with all endpoints working

## System Architecture

### Frontend Architecture
The frontend is built with React.js using TypeScript, leveraging hooks and functional components. Styling is managed with TailwindCSS and the shadcn/ui component library. Wouter is used for client-side routing, while TanStack Query handles server state management. Form handling employs React Hook Form with Zod validation. The application supports dark/light mode theming.

### Backend Architecture
The backend is an Express.js server developed with TypeScript, providing a RESTful API. Drizzle ORM facilitates database interactions. Authentication is integrated with Replit Auth using OpenID Connect, and session management utilizes Express sessions with a PostgreSQL store. API endpoints are organized by resource types.

### Database Design
PostgreSQL, hosted on Neon serverless, serves as the primary database. The schema supports a hierarchical service organization (Categories > Services > Features) with key tables for service categories, services, features, projects, enquiries, users, and site settings. The production environment utilizes MySQL.

### Content Management System
The platform features a three-tier service hierarchy: Main Service Pages, Detailed Sub-Service Pages, and Feature Detail Pages. It incorporates an advanced SEO system with dynamic meta tags, structured data, Open Graph integration, internal linking, and a professional tagging system. An admin interface provides full CRUD operations for all content types, supported by role-based access for admins, editors, and general users. An inline editing system allows for direct content modification on live pages with rich text capabilities, role-based access, and real-time updates.

### Authentication & Authorization
Authentication is handled via Replit Auth, utilizing OpenID Connect. Server-side sessions are stored in PostgreSQL. The system supports user roles (admin, editor, user) with distinct access controls, and client-side routes are protected based on authentication status.

### Development & Build Process
Vite is used for fast development and optimized production builds. The entire stack benefits from TypeScript for static type checking. ESBuild handles fast bundling for server-side code, and path aliases organize imports.

### UI/UX Decisions
The design emphasizes a professional appearance with multi-color gradient themes, shadow effects, and enhanced borders. Consistent dark mode support is integrated, and the user experience is enhanced through visual variety while maintaining professional cohesion. Essential pages like Blog, Careers, Privacy Policy, Terms of Service, FAQ, and Pricing are included with consistent design language and professional content.

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting (development).
- **MySQL/MariaDB**: Production database.

### Authentication Services
- **Replit Auth**: OAuth/OIDC authentication provider.

### UI Component Libraries
- **Radix UI**: Unstyled, accessible UI primitives.
- **Lucide React**: Icon library.
- **TailwindCSS**: Utility-first CSS framework.
- **shadcn/ui**: Component library.

### Development Tools
- **Drizzle ORM / Drizzle Kit**: Database interaction, migration, and schema management.
- **React Hook Form**: Form state management and validation.
- **Zod**: TypeScript-first schema validation.
- **TanStack Query**: Data fetching and caching.
- **Wouter**: Lightweight client-side routing.

### Build & Runtime Tools
- **Vite**: Development server and build tool.
- **ESBuild**: Fast JavaScript bundler.
- **PostCSS**: CSS processing.
- **TypeScript**: Static type checking and compilation.
- **Express.js**: Backend web framework.
- **mysql2**: MySQL client for Node.js (production).