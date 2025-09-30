# PropFind - Personalized Property Search

## Overview

PropFind is a property search application that automatically aggregates listings from realestate.com.au and domain.com.au. The application provides personalized search criteria management, transport analysis, and detailed property comparisons to help users find their ideal property. It draws design inspiration from Airbnb and Zillow for property discovery UX, with Notion-style influences for personalization and criteria management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and data fetching

**UI Component Library**
- shadcn/ui (New York style) built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for component variant management
- Design system supports both light and dark modes with HSL-based color palette

**Component Structure**
- `/client/src/components/ui/` - Reusable UI primitives (buttons, cards, dialogs, etc.)
- `/client/src/components/` - Application-specific components (PropertyCard, SearchCriteriaPanel, etc.)
- `/client/src/pages/` - Route-level page components (SearchPage, SavedPage, ComparePage)

**State Management Approach**
- React Query for asynchronous server state
- React hooks (useState, useContext) for local component state
- No global state management library currently implemented

**Key Features**
- Property search with customizable criteria (price, bedrooms, location, flooring, facing direction)
- Saved properties and comparison functionality
- Transport analysis showing travel time and cost to work locations
- Australian suburb autocomplete with state and postcode data
- Responsive sidebar navigation with mobile support

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- TypeScript for type safety across the entire stack
- Session-based architecture prepared (connect-pg-simple for session storage)

**Development vs Production**
- Development: Vite dev server integrated as Express middleware for HMR
- Production: Serves static built assets from `/dist/public`

**API Structure**
- RESTful API endpoints prefixed with `/api`
- Routes registered in `/server/routes.ts`
- Storage abstraction layer with `IStorage` interface for CRUD operations
- Currently uses in-memory storage (`MemStorage`) - designed to be swapped with database implementation

**Error Handling**
- Centralized error handler middleware
- Structured error responses with status codes and messages

### Data Storage Solutions

**Database Configuration**
- Drizzle ORM configured for PostgreSQL
- Neon Database serverless PostgreSQL (@neondatabase/serverless)
- Schema defined in `/shared/schema.ts` with type-safe models

**Current Schema**
- Users table with UUID primary keys, username, and password fields
- Zod schemas for runtime validation (drizzle-zod integration)
- TypeScript types inferred from Drizzle schema

**Storage Pattern**
- Abstract `IStorage` interface allows switching between in-memory and database implementations
- Migration files output to `/migrations` directory
- Database URL required via `DATABASE_URL` environment variable

### Authentication and Authorization

**Current State**
- Basic user schema prepared (username/password)
- Session management infrastructure configured (connect-pg-simple)
- No active authentication implementation yet

**Planned Approach**
- Session-based authentication using PostgreSQL-backed sessions
- User registration and login endpoints to be implemented
- Protected routes for saved properties and personalized searches

## External Dependencies

### Third-Party UI Libraries
- **Radix UI** - Headless UI component primitives (dialogs, dropdowns, accordions, etc.)
- **shadcn/ui** - Pre-built component implementations based on Radix UI
- **Lucide React** - Icon library for consistent iconography
- **Embla Carousel** - Touch-friendly carousel component for property image galleries

### Utility Libraries
- **clsx & tailwind-merge** - Conditional className composition
- **date-fns** - Date formatting and manipulation
- **cmdk** - Command palette/search functionality
- **nanoid** - Unique ID generation

### External Data Sources (Planned Integration)
- **realestate.com.au** - Property listing scraping/API integration (not yet implemented)
- **domain.com.au** - Property listing scraping/API integration (not yet implemented)
- Transport APIs for calculating travel times and costs (not yet implemented)

### Development Tools
- **Replit-specific plugins** - Runtime error overlay, cartographer, dev banner
- **Drizzle Kit** - Database schema management and migrations
- **esbuild** - Fast JavaScript bundler for production builds

### Fonts
- **Google Fonts** - Inter (primary), Poppins (secondary), DM Sans, Fira Code, Geist Mono, Architects Daughter

### Design System
- Custom HSL-based color palette with light/dark mode support
- Primary color: Deep navy blue (220 85% 20%)
- Semantic color tokens (success, warning, info, destructive)
- Consistent spacing scale based on Tailwind units (2, 4, 6, 8, 12, 16)

### Build & Deployment
- Node.js runtime environment
- PostgreSQL database (production)
- Environment variables required: `DATABASE_URL`, `NODE_ENV`