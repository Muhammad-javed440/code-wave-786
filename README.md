# 📜 Code Wave AI Technology Platform

**Code Wave AI** is a premium, modern technology brand platform showcasing AI-driven projects, voice automation solutions, and web innovation.

## 🚀 Vision
Establishing a high-end digital presence for Code Wave AI through secure user management, media-rich project showcases, and a powerful admin-controlled ecosystem.

## 📁 Project Structure
```text
.
├── components/          # Reusable UI components
│   ├── DualImageFrame.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── ThemeToggle.tsx
├── context/             # Global State Management (Auth, Theme)
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── lib/                 # Core utilities & API clients
│   └── supabase.ts
├── pages/               # Main application pages
│   ├── admin/           # Admin-only dashboard pages
│   │   ├── Dashboard.tsx
│   │   ├── Projects.tsx
│   │   └── Settings.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Projects.tsx
│   └── Signup.tsx
├── App.tsx              # Main routing and app structure
├── constants.ts         # App-wide configuration and static data
├── index.tsx            # Application entry point
├── types.ts             # TypeScript interfaces and enums
├── sql_query.txt        # Supabase database initialization script
└── README.md            # Project documentation
```

## 🛠 Tech Stack
- **Frontend:** React 19 (TypeScript)
- **Styling:** Tailwind CSS (Dark/Light Mode support)
- **Icons:** Lucide React
- **Backend/Database:** Supabase (Auth, PostgreSQL, RLS)
- **Charts:** Recharts
- **Routing:** React Router v7

## ✨ Key Features

### 1. Authentication & Security
- **Role-Based Access:** Standard users and specific Admins.
- **Admin Lock:** Exclusive admin access for `meherjaved440@gmail.com` and `codewaveai44@gmail.com`.
- **Row Level Security (RLS):** Data is protected at the database level.

### 2. Modern UI/UX
- **Glassmorphism:** Elegant, translucent UI components.
- **Dual-Image Frames:** Interactive project cards with hover-reveal secondary images.
- **Dark Mode:** Full system-aware or manual toggle.
- **Animations:** Smooth transitions using CSS and Tailwind.

### 3. Analytics & Tracking
- **Visit Tracking:** Real-time logging of site visits and unique users.
- **Admin Dashboard:** Visualized traffic stats using Area Charts.

### 4. Project Showcase
- **Media Gallery:** Support for multiple images and video highlights.
- **Interaction:** Like system, rating displays, and detailed descriptions.

### 5. Contact & Leads
- **Smart Contact Form:** Captures messages and optional user location via Geolocation API.

## ⚙️ Setup Instructions

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Initialization
1. Go to your Supabase Project.
2. Open the **SQL Editor**.
3. Copy the contents of `sql_query.txt` and run the script.
4. This will create all necessary tables and security policies.

## 📜 Constitution Rules
- **Admin Roles:** Strictly restricted to two specific emails.
- **Performance:** Optimized for speed and responsiveness.
- **Aesthetics:** High-contrast tech-focused design with professional animations.

---
Developed with ❤️ by **Code Wave AI Team**.