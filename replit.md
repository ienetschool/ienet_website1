## Overview

IeNet is a comprehensive enterprise IT services platform designed to provide extensive solutions across various technology domains. It features a hierarchical service architecture encompassing 15 main service categories, over 91 detailed services, and more than 795 feature pages, complemented by 10 diverse project showcases. The platform functions as a modern full-stack web application, offering a professional marketing website with detailed service hierarchies, technical specifications, and an advanced admin management system for content administration. Its business vision is to deliver enterprise-level IT services efficiently, leveraging a robust content management infrastructure and a user-friendly interface.

## User Preferences

Preferred communication style: Simple, everyday language.
Recent request: Enhanced inner pages with detailed, informative content and comprehensive website structure.
Technical approach preference: Focus on working solutions rather than extensive debugging of complex issues.

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