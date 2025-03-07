# Landing Page Project with Nuxt.js & Payload CMS

A modern landing page application using Nuxt.js for the frontend and Payload CMS for content management.

## VIDEO
- https://youtu.be/HO7JSoGn_ZE

## Features

- Component-based architecture
- Dynamic block system for content management
- Type-safe development with TypeScript
- Integrated form handling
- Rich text editing

## Technologies

### Frontend (nuxt-app)

- Nuxt.js 3
- Vue 3
- TypeScript

### Backend (payload-cms)

- Payload CMS
- SQLite Database
- NextJS 15
- TypeScript

## Getting Started

### 1. Backend Setup (payload-cms)

```bash
cd payload-cms
npm install

# Set up environment variables
cp .env.example .env
# Configure PAYLOAD_SECRET and DATABASE_URI

# Start development server
npm run dev
```

The Nuxt application will be available at http://localhost:3001

## Development

- Frontend development server: `npm run dev` in nuxt-app directory
- Backend development server: `npm run dev` in payload-cms directory
- Type synchronization: `npm run sync-types` in nuxt-app directory
