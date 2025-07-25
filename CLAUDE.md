# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nilegu-ui is a React TypeScript application for learning Esperanto through comprehensible input. It provides interactive texts with translations and audio recordings to facilitate natural language acquisition.

## Development Commands

- `npm start` - Launch development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm test` - Run tests with Jest and React Testing Library
- `npm install` - Install dependencies

## Architecture

### Core Structure
- **React 18** with TypeScript and functional components using hooks
- **Material-UI (MUI)** for UI components with custom theme
- **React Router** for navigation between pages
- **Axios** for API communication

### Key Directories
- `src/pages/` - Main application pages (HomePage, CatalogPage, TextReaderPage)
- `src/hooks/` - Custom React hooks for data management
- `src/services/` - API service layer
- `src/types/` - TypeScript interfaces and type definitions

### API Integration
- Base URL: `https://ikurso.esperanto-france.org/api.php`
- Endpoints:
  - `?path=tekstoj` - Fetch all texts
  - `?path=tekstoj/{id}` - Fetch specific text details
- API uses Esperanto field names (e.g., `auxtoro` instead of `aŭtoro`)
- Data transformation happens in `src/services/api.ts`

### State Management
- Custom hooks pattern (`useTekstoj`, `useTekstoDetaloj`, `useTekstojSearch`)
- No external state management library - relies on React hooks
- Local state for UI interactions (filters, audio controls, word selection)

### Key Components Architecture
- **App.tsx**: Main routing and MUI theme configuration
- **HomePage**: Landing page with method explanation and navigation
- **CatalogPage**: Text catalog with search, filters, and pagination
- **TextReaderPage**: Interactive text reader with audio controls and word translations

### Data Flow
1. API calls through `tekstojService` in `src/services/api.ts`
2. Data transformation from API format to application types
3. Custom hooks manage loading states, errors, and caching
4. Pages consume data through hooks and handle UI interactions

### Styling
- Custom MUI theme with Esperanto-inspired colors (primary: #554E47)
- CSS-in-JS with MUI's styling system
- Custom typography variant `appTitle` for app branding
- Responsive design with mobile-first approach

### Audio Features
- HTML5 audio element for text pronunciation
- Audio controls in TextReaderPage
- MP3 files served from API (`sono` field)

### Text Interaction
- Clickable words with translation popups
- Dictionary integration through `vortaro` field
- Interactive reading experience with comprehensible input methodology