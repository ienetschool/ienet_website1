## Overview

IeNet is a comprehensive enterprise IT services platform designed to provide extensive solutions across various technology domains. It features a hierarchical service architecture encompassing 15 main service categories, over 91 detailed services, and more than 795 feature pages, complemented by 10 diverse project showcases. The platform functions as a modern full-stack web application, offering a professional marketing website with detailed service hierarchies, technical specifications, and an advanced admin management system for content administration. Its business vision is to deliver enterprise-level IT services efficiently, leveraging a robust content management infrastructure and a user-friendly interface.

## User Preferences

Preferred communication style: Simple, everyday language.
Recent request: Fixed critical dashboard issues - Pages Management showing 0 pages, Services vs Sub-Services showing identical data, and non-functional Edit/Eye buttons.
Technical approach preference: Focus on working solutions rather than extensive debugging of complex issues.
Recent fixes (Aug 19, 2025): Successfully resolved Services vs Sub-Services differentiation by implementing proper API routing - Services Management now shows service categories (25 total), Sub-Services Management shows actual sub-services (143 total), fixed duplicate titles, and resolved API endpoint confusion.
New Request (Aug 19, 2025): Implement advanced visual website builder with drag-and-drop functionality, live editing, SEO tools, and advanced data tables with pagination/filtering - similar to Webflow/Elementor Pro.
Integration Update (Aug 19, 2025): Successfully integrated Advanced Visual Website Builder directly into existing Pages Management workflow instead of separate route. Users can now access Visual Editor, AI Content Generator, and Schema Editor directly from the pages table using dedicated action buttons.
UI/UX Improvements (Aug 19, 2025): Enhanced homepage with contextual icons for services, gradient backgrounds for testimonials, cleaner footer design with icon-only approach for social media and payments, and improved visual hierarchy throughout.
Database Management (Aug 19, 2025): Created comprehensive database backup for August 19, 2025 - files: ienet-database-backup-20250819.sql (409KB) and compressed version ienet-database-backup-20250819.sql.gz (30KB). Backup includes all 41 tables with complete data structure and content.
Production Deployment (Aug 20, 2025): TROUBLESHOOTING PHASE - Database migration 100% complete with verified data (25 categories, 143 services, 1160 features, 1328 total pages). Addressing Plesk Node.js startup compatibility issues. Created ultra-simple Express app (test-mysql-connection.js) to bypass complex dependencies. Database connection verified working. Multiple deployment options prepared: Plesk Node.js, PM2, and systemd service. Working on final Node.js application startup for ienet.online production server.

## System Architecture

### Frontend Architecture
The frontend is built with React.js using TypeScript, leveraging hooks and functional components. Styling is managed with TailwindCSS and the shadcn/ui component library for a consistent design system. Wouter is used for lightweight client-side routing, while TanStack Query (React Query) handles server state management and caching. Form handling employs React Hook Form with Zod validation for type safety. The application also supports dark/light mode theming.

### Backend Architecture
The backend is an Express.js server developed with TypeScript, providing a RESTful API. Drizzle ORM facilitates interactions with the PostgreSQL database. Authentication is integrated with Replit Auth using OpenID Connect, and session management utilizes Express sessions with a PostgreSQL store. API endpoints are organized by resource types, such as services, projects, and enquiries.

### Database Design
PostgreSQL, hosted on Neon serverless, serves as the primary database. The schema supports a hierarchical service organization (Categories > Services > Features) with key tables for service categories, services, features, projects, enquiries, users, and site settings.

### Content Management System
The platform features a three-tier service hierarchy: Main Service Pages, Detailed Sub-Service Pages, and Feature Detail Pages. It incorporates an advanced SEO system with dynamic meta tags, structured data, Open Graph integration, internal linking, and a professional tagging system. An admin interface provides full CRUD operations for all content types, supported by role-based access for admins, editors, and general users. Enhanced inner pages ensure comprehensive content, and navigation includes breadcrumbs and floating CTAs. An inline editing system allows for direct content modification on live pages with rich text capabilities, role-based access, and real-time updates.

### Authentication & Authorization
Authentication is handled via Replit Auth, utilizing OpenID Connect. Server-side sessions are stored in PostgreSQL. The system supports user roles (admin, editor, user) with distinct access controls, and client-side routes are protected based on authentication status.

### Development & Build Process
Vite is used for fast development and optimized production builds. The entire stack benefits from TypeScript for static type checking. ESBuild handles fast bundling for server-side code, and path aliases organize imports.

### UI/UX Decisions
The design emphasizes a professional appearance with multi-color gradient themes, shadow effects, and enhanced borders across different content tiers. Consistent dark mode support is integrated, and the user experience is enhanced through visual variety while maintaining professional cohesion. Essential pages like Blog, Careers, Privacy Policy, Terms of Service, FAQ, and Pricing are included with consistent design language and professional content.

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting.

### Authentication Services
- **Replit Auth**: OAuth/OIDC authentication provider.

### UI Component Libraries
- **Radix UI**: Unstyled, accessible UI primitives.
- **Lucide React**: Icon library.
- **TailwindCSS**: Utility-first CSS framework.

### Development Tools
- **Drizzle Kit**: Database migration and schema management.
- **React Hook Form**: Form state management and validation.
- **Zod**: TypeScript-first schema validation.
- **TanStack Query**: Data fetching and caching.

### Build & Development Tools
- **Vite**: Development server and build tool.
- **ESBuild**: Fast JavaScript bundler.
- **PostCSS**: CSS processing.
- **TypeScript**: Static type checking and compilation.