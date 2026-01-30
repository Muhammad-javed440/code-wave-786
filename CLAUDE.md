# CLAUDE.md - Code Wave AI Platform

## Project Overview
Code Wave AI is a premium technology brand platform built with React + TypeScript + Vite + Supabase. It showcases AI-driven projects, voice automation solutions, and web innovation with role-based authentication.

## Tech Stack
- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 3.4 (Dark/Light mode with `class` strategy)
- **Backend/Database:** Supabase (Auth, PostgreSQL, RLS)
- **Routing:** React Router v7 (HashRouter)
- **Charts:** Recharts
- **Icons:** Lucide React

## Project Structure
```
code-wave-ai/
├── components/           # Reusable UI components
│   ├── DualImageFrame.tsx   # Interactive hover-reveal image cards
│   ├── Footer.tsx           # Site footer with social links
│   ├── Navbar.tsx           # Main navigation with auth state
│   └── ThemeToggle.tsx      # Dark/Light mode toggle
├── context/              # Global state management
│   ├── AuthContext.tsx      # Authentication state & user management
│   └── ThemeContext.tsx     # Theme state (dark/light)
├── lib/
│   └── supabase.ts          # Supabase client configuration
├── pages/                # Main application pages
│   ├── admin/               # Admin-only pages (protected)
│   │   ├── Dashboard.tsx    # Admin dashboard with analytics
│   │   ├── Projects.tsx     # Project CRUD management
│   │   └── Settings.tsx     # Admin profile settings
│   ├── About.tsx            # Company/brand story
│   ├── Contact.tsx          # Contact form with geolocation
│   ├── Home.tsx             # Landing page with visitor tracking
│   ├── Login.tsx            # User login
│   ├── Projects.tsx         # Public project showcase
│   └── Signup.tsx           # User registration
├── App.tsx               # Main app with routing & protected routes
├── constant.ts           # App-wide constants
├── types.ts              # TypeScript interfaces & enums
├── index.tsx             # Application entry point
├── index.html            # HTML template
├── sql_query.txt         # Supabase database initialization SQL
└── CONSTITUTION.md       # Project rules & requirements
```

## Development Commands
```bash
npm run dev      # Start development server (port 3000)
npm run build    # TypeScript compile + Vite production build
npm run preview  # Preview production build
```

## Environment Variables
Create `.env.local` with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Key Patterns & Conventions

### Authentication
- Two roles only: `Admin` and `User` (defined in `types.ts` as `UserRole` enum)
- Admin emails are hardcoded: `meherjaved440@gmail.com`, `javedstore1013@gmail.com`, and `codewaveai44@gmail.com`
- Protected routes use `ProtectedRoute` component in `App.tsx`
- Auth state managed via `AuthContext`

### Routing
- Uses `HashRouter` for compatibility
- Admin routes prefixed with `/admin`
- `ScrollToTop` component resets scroll on navigation

### Styling
- Dark mode via Tailwind `dark:` classes
- Theme toggled by adding/removing `dark` class on root element
- Glassmorphism effects used throughout
- Custom animations defined in `tailwind.config.js`:
  - `bounce-subtle`
  - `float`, `float-delayed`, `float-slow`

### Database (Supabase)
Core tables with RLS:
- `profiles` - User profiles
- `projects` - Project data
- `project_media` - Project images/videos
- `project_likes`, `project_ratings`, `project_comments` - User interactions
- `site_visits` - Analytics tracking
- `contact_messages` - Contact form submissions

## Important Notes
1. **Never change admin email policy** - Only the two specified emails can be admins
2. **RLS is required** on all Supabase tables
3. **No admin logic only on frontend** - Must be enforced at database level
4. **Keep animations professional** - Enhance, not distract
5. Build output directory: `dist/`
6. TypeScript strict mode enabled

## File Naming
- Components: PascalCase (e.g., `DualImageFrame.tsx`)
- Utilities/config: camelCase (e.g., `supabase.ts`)
- Pages follow component naming convention
