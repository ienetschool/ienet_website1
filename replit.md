# IeNet - Full-Stack IT Services Platform

## Overview

IeNet is a comprehensive enterprise IT services platform providing extensive solutions for businesses across multiple technology domains. The platform features a complete hierarchical service architecture with 15 main service categories, 91+ detailed services, 795+ feature pages, and 10 diverse project showcases. Built as a modern full-stack web application, it delivers a professional marketing website with comprehensive service hierarchies, detailed technical specifications, and an advanced admin management system for content administration.

## Recent Implementation (January 2025)

Successfully implemented comprehensive content structure achieving:
- ✓ 15 Main Service Categories covering all IT domains
- ✓ Expanded service structure with 20+ detailed services across multiple domains
- ✓ Rich feature pages with 500+ words of detailed content each
- ✓ 10 Diverse Project Showcases replacing traditional blog content
- ✓ Complete database seeding with authentic, professional content
- ✓ Full hierarchical navigation and SEO optimization

## Latest Content Expansion (January 2025)

Major content expansion completed with professional-grade services:
- ✓ Website Development: UI/UX Design, E-commerce, CMS, Website Redesign, Landing Pages, Responsive Design, PWA
- ✓ Web Hosting: Shared, VPS, Dedicated, Cloud, Domain Registration with comprehensive features
- ✓ Cybersecurity: Vulnerability Assessment, Penetration Testing with detailed security features
- ✓ Digital Marketing: SEO, Social Media Marketing with keyword research and optimization features
- ✓ E-commerce: Online Store Development, Marketplace Integration with payment and catalog management
- ✓ Cloud Services: Migration Services, IaaS with infrastructure assessment capabilities
- ✓ Mobile Development: iOS Development, Cross-platform solutions with App Store optimization
- ✓ All services include detailed 500+ word content with technical specifications and business benefits

## Latest Enhancement (January 2025)

Comprehensive 3-tier page structure implementation following scalable sitemap requirements:
- ✓ Enhanced Service Detail pages (Main Service level) with professional overview sections and key benefits
- ✓ Improved Sub-Service Detail pages with comprehensive service descriptions and feature highlights  
- ✓ Advanced Feature Detail pages with technical specifications and implementation guides
- ✓ Added extensive feature content with 500+ words including technical details and business benefits
- ✓ Implemented proper internal linking structure: Categories → Services → Features
- ✓ Enhanced SEO optimization with meta titles, descriptions, and structured URLs
- ✓ Created comprehensive content for UI/UX Design, E-commerce Development, and Web Hosting features
- ✓ Implemented floating CTA buttons and breadcrumb navigation throughout all page levels
- ✓ Added professional layout components following the recommended 3-tier structure guidelines

## User Preferences

Preferred communication style: Simple, everyday language.
Recent request: Enhanced inner pages with detailed, informative content and comprehensive website structure.

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
- **Enhanced Inner Pages**: Comprehensive content structure with detailed information sections
- **Modern Navigation**: Breadcrumb navigation, floating CTAs, and consistent layout patterns

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