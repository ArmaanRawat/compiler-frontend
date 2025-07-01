# Ar Compiler Platform

## Overview

PT is a full-stack web application that provides an online code compilation and execution platform. It allows users to write, execute, and share code in multiple programming languages through a modern web interface. The platform features a React-based frontend with Monaco Editor integration and an Express.js backend with PostgreSQL database support using Drizzle ORM.

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom dark/light theme support
- **UI Components**: Radix UI components with shadcn/ui design system
- **Code Editor**: Monaco Editor for syntax highlighting and advanced editing features
- **State Management**: React hooks with custom useCompiler hook for compilation logic
- **Routing**: React Router for client-side navigation
- **Animations**: Framer Motion for smooth UI transitions

### Backend Architecture

- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for fast bundling and deployment

### Data Storage

- **Database**: PostgreSQL 16 with Neon Database integration
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Shared schema definitions between frontend and backend
- **Migrations**: Drizzle Kit for database schema management

## Key Components

### Frontend Components

- **CompilerView**: Main compilation interface with editor, input, and output panels
- **CodeEditor**: Monaco Editor wrapper with language-specific syntax highlighting
- **LanguageSelector**: Dropdown for selecting programming languages
- **OutputDisplay**: Real-time compilation results and error display
- **CommandPalette**: Keyboard shortcut interface for quick actions
- **ThemeToggle**: Dark/light mode switching functionality

### Backend Components

- **Routes**: RESTful API endpoints (currently minimal setup)
- **Storage**: Abstracted storage interface with in-memory implementation
- **Vite Integration**: Development server with HMR support

### External Integration

- **Compilation API**: External service at `compile-me-api.onrender.com` for code execution
- **Supported Languages**: Python, JavaScript, TypeScript, Java, C++, C, Go, Rust, Kotlin, C#, and custom BasicCode language

## Data Flow

1. **Code Editing**: User writes code in Monaco Editor with real-time syntax highlighting
2. **Language Selection**: User selects programming language from dropdown or command palette
3. **Code Execution**: Frontend sends compilation request to external API service
4. **Result Display**: Compilation output or errors are displayed in real-time
5. **Theme Persistence**: User preferences stored in localStorage
6. **Keyboard Shortcuts**: Command palette and execution shortcuts for improved UX

## External Dependencies

### Core Dependencies

- **@neondatabase/serverless**: Neon Database client for PostgreSQL
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web framework for backend API
- **react**: Frontend framework
- **monaco-editor**: Code editor with syntax highlighting
- **@radix-ui/\***: Headless UI components
- **framer-motion**: Animation library
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies

- **vite**: Build tool and development server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundler for production builds
- **drizzle-kit**: Database schema management

## Deployment Strategy

### Development Environment

- **Runtime**: Replit with Node.js 20, Web, and PostgreSQL 16 modules
- **Port Configuration**: Backend on port 5000, exposed as port 80
- **Development Server**: `npm run dev` with hot module replacement
- **Database**: Local PostgreSQL instance in Replit environment

### Production Deployment

- **Build Process**: Vite build for frontend, esbuild for backend
- **Deployment Target**: Autoscale deployment on Replit
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **Static Assets**: Frontend built to `dist/public`, served by Express

### Database Management

- **Schema Location**: `shared/schema.ts` for type sharing
- **Migrations**: Generated in `./migrations` directory
- **Configuration**: `drizzle.config.ts` for database configuration

## Changelog

```
Changelog:
- June 23, 2025. Initial setup
- June 23, 2025. Migration from Bolt to Replit completed successfully
- June 23, 2025. Massive UI overhaul with Three.js integration
- June 23, 2025. All compiler buttons made functional with animations
- June 23, 2025. Landing page redesigned with stunning visuals
- June 23, 2025. Enhanced output display with animated feedback
- June 23, 2025. Improved navbar with gradient animations
- June 23, 2025. Added functional file upload/download features
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
