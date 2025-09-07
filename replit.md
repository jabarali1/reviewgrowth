# ChartFlow - Analytics Dashboard

## Overview

ChartFlow is a modern full-stack web application that provides analytics dashboard functionality with user authentication. The application is built as a monolithic structure with a React frontend and Express.js backend, designed for data visualization and user management. The project uses modern web technologies including TypeScript, Tailwind CSS, and shadcn/ui components to deliver a polished user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Single-page application using React 18 with TypeScript for type safety
- **Component Library**: Utilizes shadcn/ui component system built on Radix UI primitives for consistent, accessible UI components
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **Routing**: Wouter for client-side routing with protected route implementation
- **Form Handling**: React Hook Form with Zod validation schemas

### Backend Architecture
- **Express.js Server**: RESTful API server with middleware for logging, JSON parsing, and error handling
- **TypeScript**: Full TypeScript implementation for type safety across the backend
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development, designed to be easily replaceable with database implementations
- **Development Setup**: Vite integration for hot module replacement and development server proxy

### Authentication System
- **Supabase Integration**: Complete authentication system using Supabase for user management, including sign-up, sign-in, and password reset functionality
- **Protected Routes**: Client-side route protection with loading states and automatic redirects
- **Session Management**: Persistent authentication state with automatic session refresh

### Database Design
- **Drizzle ORM**: Type-safe database interactions with PostgreSQL dialect
- **Schema Definition**: Centralized schema definitions in shared directory for type consistency
- **Migration System**: Database migration support with Drizzle Kit for schema changes

### Build and Deployment
- **Monorepo Structure**: Single repository with separate client and server directories, shared types and schemas
- **Build Pipeline**: Vite for frontend bundling, esbuild for backend compilation
- **Development Environment**: Integrated development setup with file watching and auto-restart

## External Dependencies

### Authentication & Database Services
- **Supabase**: Complete backend-as-a-service providing authentication, database, and real-time features
- **Neon Database**: Serverless PostgreSQL database for production data storage

### UI & Styling Libraries
- **Radix UI**: Headless component library providing accessible primitives for complex UI components
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component system combining Radix UI with Tailwind CSS

### Development & Build Tools
- **Vite**: Fast build tool and development server with hot module replacement
- **TypeScript**: Static type checking across the entire application
- **Drizzle Kit**: Database migration and schema management tool
- **esbuild**: Fast JavaScript bundler for backend compilation

### Runtime Dependencies
- **React Query**: Server state management with caching and background updates
- **React Hook Form**: Form handling with validation integration
- **Zod**: Schema validation library for runtime type checking
- **date-fns**: Date manipulation and formatting utilities