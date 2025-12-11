# Photo Date Rescue - Marketing Website

## Overview

Photo Date Rescue is a marketing and landing page website for a photo metadata repair software product. The application helps users fix incorrect or missing dates on photos exported from various cloud services (Google Photos, iCloud, WhatsApp, OneDrive) and hardware devices. The site includes product information, pricing tiers, user guides, legal pages (Terms, Privacy, Refund Policy), and integration with Lemon Squeezy for payment processing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **State Management**: TanStack React Query for server state
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with custom plugins for meta image handling and Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript compiled with tsx
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Session Storage**: In-memory storage (MemStorage class) with interface for future database migration

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` contains database table definitions
- **Current State**: Basic users table with id, username, password fields
- **Migrations**: Drizzle Kit configured to output to `./migrations` directory

### Static Content
- **Landing Page**: Pure HTML/CSS served from `client/index.html` and `client/public/`
- **Guide Pages**: Static HTML pages in `client/guides/` for cloud services, hardware devices, social apps, and scanning guides
- **React App**: SPA for Terms, Privacy, and Refund Policy pages rendered via React components

### Build System
- **Client Build**: Vite compiles React app to `dist/public`
- **Server Build**: esbuild bundles server code to `dist/index.cjs`
- **Asset Handling**: Static assets copied from `client/public` and `client/guides`

## External Dependencies

### Payment Processing
- **Lemon Squeezy**: Payment gateway integration via embedded checkout modal script
- **Pricing Tiers**: Free demo, Monthly subscription ($16.99), and Lifetime license options

### Third-Party Services
- **Lemon Squeezy Checkout**: Client-side script loaded from `assets.lemonsqueezy.com`
- **External Web App**: Links to `webapp.photodaterescue.com` for the actual photo processing tool

### Database
- **PostgreSQL**: Required for production deployment
- **Connection**: Via `DATABASE_URL` environment variable
- **Driver**: `pg` package with `connect-pg-simple` for session storage capability

### Development Tools
- **Replit Plugins**: Dev banner, cartographer, and runtime error overlay for development environment
- **Vite Dev Server**: HMR enabled with custom path handling for development