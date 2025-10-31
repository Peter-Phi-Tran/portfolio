<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->
# React Portfolio Project - Copilot Instructions

## Project Overview
This is a modern React portfolio website built with TypeScript, Vite, and Three.js 3D graphics. The design features a sophisticated 3D carousel with curved panels and smooth mouse interactions.

## Tech Stack
- **Frontend**: React 19.1.1 + TypeScript
- **Build Tool**: Vite with Rolldown
- **3D Graphics**: Three.js with WebGL and custom shaders
- **Styling**: Tailwind CSS + Custom CSS
- **Fonts**: Inter + Work Sans + JetBrains Mono + Geist Mono

## Key Features
- 3D curved carousel using Three.js with custom GLSL shaders
- Matrix text scrambling animation on buttons
- Translucent glassmorphism header with backdrop blur
- Mouse Y-axis tilt control for carousel
- Responsive design with mobile-first approach
- Clean minimal color palette (whites, blacks, subtle grays)

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

## Component Architecture
- **Header**: Fixed translucent navigation with matrix buttons
- **Hero**: Main section with title, carousel, and description
- **Carousel**: Three.js WebGL canvas with curved 3D panels
- **Matrix Effect**: Custom text scrambling animation on hover

## Design Principles
- Minimalist aesthetic with clean typography
- High contrast typography (black on white)
- Subtle glassmorphism effects with backdrop blur
- Monospace fonts for technical elements
- Smooth 3D animations with proper GPU acceleration