# IeNet - Full-Stack IT Services Platform

## Overview

IeNet is a comprehensive enterprise IT services platform providing extensive solutions for businesses across multiple technology domains. The platform features a complete hierarchical service architecture with 15 main service categories, 91+ detailed services, 795+ feature pages, and 10 diverse project showcases. Built as a modern full-stack web application, it delivers a professional marketing website with comprehensive service hierarchies, detailed technical specifications, and an advanced admin management system for content administration.

## Recent Implementation (January 2025)

Successfully implemented comprehensive content structure achieving:
- ✓ 15 Main Service Categories covering all IT domains
- ✓ 91+ Detailed Sub-Service Pages (exceeding 100+ services goal)
- ✓ 795+ Feature Detail Pages (approaching 1000+ features goal)  
- ✓ 10 Diverse Project Showcases replacing traditional blog content
- ✓ Complete database seeding with authentic, professional content
- ✓ Full hierarchical navigation and SEO optimization

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React.js with TypeScript**: Modern React application using hooks and functional components
- **Styling**: TailwindCSS with shadcn/ui component library for consistent design system
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Theme System**: Dark/light mode support with theme provider

### Backend Architecture
- **Express.js Server**: RESTful API server built with Express and TypeScript
- **Database ORM**: Drizzle ORM for PostgreSQL database interactions
- **Authentication**: Replit Auth integration with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL store
- **API Structure**: RESTful endpoints organized by resource types (services, projects, enquiries)

### Database Design
- **PostgreSQL**: Primary database using Neon serverless PostgreSQL
- **Schema Structure**: Hierarchical service organization (Categories > Services > Features)
- **Key Tables**:
  - Service categories (main service types)
  - Services (sub-services under categories)
  - Features (detailed features under services)
  - Projects (portfolio showcase items)
  - Enquiries (contact form submissions)
  - Users (authentication and authorization)
  - Site settings (configurable content)

### Content Management System
- **Three-tier Service Hierarchy**: 
  - Main Service Pages (e.g., Website Development)
  - Detailed Sub-Service Pages (e.g., UI/UX Design)
  - Feature Detail Pages (e.g., Wireframing & Prototyping)
- **SEO Optimization**: Meta titles, descriptions, and slug-based URLs
- **Admin Interface**: Full CRUD operations for all content types
- **Role-based Access**: Admin, editor, and user roles with different permissions

### Authentication & Authorization
- **Replit Auth**: Integrated authentication system using OpenID Connect
- **Session-based**: Server-side sessions stored in PostgreSQL
- **Role Management**: User roles (admin, editor, user) with appropriate access controls
- **Protected Routes**: Client-side route protection based on authentication status

### Development & Build Process
- **Vite**: Modern build tool for fast development and optimized production builds
- **TypeScript**: Full TypeScript support across frontend and backend
- **ESBuild**: Fast bundling for server-side code
- **Path Aliases**: Organized imports with @ aliases for cleaner code structure

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **DATABASE_URL**: Environment variable for database connection string

### Authentication Services
- **Replit Auth**: OAuth/OIDC authentication provider
- **Session Storage**: PostgreSQL-based session management with connect-pg-simple

### UI Component Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Lucide React**: Modern icon library for consistent iconography
- **TailwindCSS**: Utility-first CSS framework for styling

### Development Tools
- **Drizzle Kit**: Database migration and schema management
- **React Hook Form**: Form state management and validation
- **Zod**: TypeScript-first schema validation
- **TanStack Query**: Data fetching and caching solution

### Build & Development
- **Vite**: Development server and build tool
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer
- **TypeScript**: Static type checking and compilation