# replit.md

## Overview

This is a modern full-stack web application for a professional portfolio website for Subharaj Das, an Operations & Customer Excellence Leader. The application features a responsive design with a React frontend and Express.js backend, built for showcasing professional experience, skills, and enabling contact form submissions.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js with TypeScript for API endpoints
- **Database**: PostgreSQL with Drizzle ORM (configured but not fully implemented)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for monorepo support
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Custom fetch wrapper with TanStack Query integration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL integration
- **Database Storage**: DatabaseStorage class implementing contact form persistence
- **Development**: Hot reload with tsx for development server
- **Production Build**: esbuild for server bundling

### Database Schema
- **Contact Submissions Table**: Stores form submissions with fields for first name, last name, email, subject, message, and timestamps
- **Users Table**: Basic user structure for future authentication features
- **Database Provider**: PostgreSQL with environment-based configuration

## Data Flow

1. **Contact Form Submission**: Client submits form → Form validation via Zod → API call to `/api/contact` → Server validation → Success/error response
2. **Resume Download**: Client requests resume → API call to `/api/resume/download` → Server attempts to serve file from attached_assets directory
3. **Static Assets**: Vite dev server or static file serving in production

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight router for React

### Development Tools
- **vite**: Fast build tool and dev server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundler for production builds

## Deployment Strategy

The application is configured for deployment with:

1. **Development**: 
   - Frontend: Vite dev server with HMR
   - Backend: tsx with file watching
   - Database: Environment-based connection to Neon

2. **Production Build**:
   - Frontend: Vite builds to `dist/public`
   - Backend: esbuild bundles server to `dist/index.js`
   - Static serving: Express serves built frontend assets

3. **Environment Variables**:
   - `DATABASE_URL`: PostgreSQL connection string (required)
   - `NODE_ENV`: Environment indicator

## Changelog

```
Changelog:
- July 01, 2025. Initial setup
- July 01, 2025. Added PostgreSQL database integration with contact form persistence
- July 01, 2025. Integrated professional profile photo and enhanced testimonials with LinkedIn recommendations
- July 01, 2025. Implemented DatabaseStorage with full CRUD operations for contact submissions
- July 14, 2025. Integrated Google Analytics tracking with page views and contact form event tracking
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```