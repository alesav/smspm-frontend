# SMSPM Frontend

Global SMS API & Bulk Messaging Platform Frontend built with Astro, TypeScript, and TailwindCSS.

## 🚀 Features

- **Modern Stack**: Astro 5.x + TypeScript + TailwindCSS 4.x
- **Dark Mode**: Complete dark/light theme support with system preference detection
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Performance Optimized**: Static site generation with Astro for optimal performance
- **Brand Compliant**: SMSPM brand colors and design system
- **Cloudflare Ready**: Configured for Cloudflare Pages deployment

## 📦 Tech Stack

- **Framework**: [Astro](https://astro.build/) v5.16.3
- **Language**: TypeScript with strict mode
- **Styling**: TailwindCSS v4.1.17 with PostCSS
- **Deployment**: Cloudflare Pages with `@astrojs/cloudflare` adapter
- **Package Manager**: Yarn
- **Node Version**: >=18.0.0

## 🏗️ Project Structure

```
src/
├── components/
│   └── Navigation.astro      # Main navigation component
├── layouts/
│   └── Layout.astro          # Base layout with SEO and theme support
├── pages/
│   └── index.astro          # Landing page with all sections
├── scripts/
│   ├── main.ts              # Main application JavaScript
│   └── theme-toggle.ts      # Dark mode functionality
├── styles/
│   └── global.css           # Global styles and CSS variables
public/
├── favicon.svg              # SVG favicon
└── ...                      # Static assets
```

## 🛠️ Setup & Development

### Prerequisites

- Node.js >=18.0.0
- Yarn package manager

### Installation

1. **Clone and navigate to the project**:
   ```bash
   cd /path/to/smspm-frontend
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Start development server**:
   ```bash
   yarn dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:4321`

### Available Scripts

```bash
# Development
yarn dev                # Start development server
yarn build              # Build for production
yarn preview            # Preview production build

# Utilities
yarn astro               # Run Astro CLI commands
yarn check              # Type checking
yarn clean              # Clean build artifacts
```

## 🎨 Design System

### Brand Colors

- **Primary Cyan**: `#26c6da` - Main brand color
- **Dark Blue**: `#0d47a1` - Secondary brand color  
- **Blue**: `#1e88e5` - Accent color
- **Purple**: `#7c4dff` - Highlight color
- **Pink**: `#ff4081` - Action color

### Typography

- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 400 (normal), 600 (semibold), 700 (bold), 800 (extrabold)

### Dark Mode

The application supports both light and dark themes:
- System preference detection
- Manual toggle with smooth transitions
- Persistent theme selection in localStorage
- Keyboard shortcut: `Ctrl/Cmd + D`

## 🚀 Deployment

### Cloudflare Pages

The project is configured for Cloudflare Pages deployment:

1. **Build Settings**:
   - Build command: `yarn build`
   - Build output directory: `dist`
   - Node.js version: 18+

2. **Environment Variables**:
   - No environment variables required for basic deployment

3. **Custom Domain**:
   - Configured for `smspm.com` (update in `astro.config.mjs`)

### Build Configuration

The project uses:
- **Output**: `static` (for Cloudflare Pages)
- **Adapter**: `@astrojs/cloudflare`
- **Image Service**: `compile` (optimized for Cloudflare)

## 🔧 Configuration Files

### Core Configuration

- `astro.config.mjs` - Astro configuration with Cloudflare adapter
- `tailwind.config.mjs` - TailwindCSS configuration with brand colors
- `postcss.config.mjs` - PostCSS configuration for TailwindCSS v4
- `tsconfig.json` - TypeScript configuration with strict mode

### Key Features Configured

1. **SEO Optimization**:
   - Meta tags, Open Graph, Twitter Cards
   - Canonical URLs
   - Structured data ready

2. **Performance**:
   - Static site generation
   - Optimized CSS and JS
   - Image optimization ready

3. **Accessibility**:
   - Semantic HTML
   - ARIA labels
   - Keyboard navigation support

## 🐛 Known Issues & Solutions

### TailwindCSS v4 Compatibility

If you encounter gradient class issues, the project uses:
- Custom CSS gradients in `global.css`
- TailwindCSS v4 with `@tailwindcss/postcss`
- Fallback styles for unsupported utilities

### Development Server

The development server runs on `http://localhost:4321` and includes:
- Hot module replacement
- TypeScript type checking
- CSS preprocessing

## 📝 Development Notes

### Adding New Pages

1. Create `.astro` files in `src/pages/`
2. Use the base `Layout.astro` for consistent structure
3. Import and use global styles and components

### Modifying Brand Colors

1. Update `tailwind.config.mjs` color definitions
2. Update CSS variables in `src/styles/global.css`
3. Rebuild the project

### Theme Customization

The theme system uses:
- CSS custom properties for dynamic theming
- `[data-theme]` selectors for theme-specific styles
- Smooth transitions between themes

## 🔗 Related Projects

This frontend is designed to work with:
- SMSPM Backend API
- SMSPM Dashboard
- SMSPM SMS Workers

## 📄 License

Private project - All rights reserved.

---

Built with ❤️ for SMSPM - Global SMS Messaging Platform
