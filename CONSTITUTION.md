# 📜 Constitution — Code Wave AI Technology Platform

**Project Name:** Code Wave AI Platform
**Tech Stack:** Vite + React + TypeScript + Supabase
**Domain Focus:** AI Voice Chatbots, Automation, Web Technologies

---

## 1. Vision & Purpose

The purpose of this platform is to establish **Code Wave AI** as a premium, modern technology brand showcasing AI-driven projects, voice automation solutions, and web innovation. The website will serve three core goals:

1. **Authentication & User Management** (secure, role-based)
2. **Project Showcase & Interaction** (media-rich, engaging)
3. **Admin-Controlled Content Publishing** (powerful but simple)

This platform must feel:

* Modern
* Fast
* Animated but professional
* Scalable for future AI tools

---

## 2. User Roles & Access Control

### 2.1 Roles

There will be **two roles only**:

* **Admin**
* **User**

### 2.2 Admin Email Policy

Only the following emails can ever be assigned the **Admin** role:

* `meherjaved440@gmail.com`
* `codewaveai44@gmail.com`

Any other email must **always** be assigned the **User** role.

This rule is enforced at:

* Supabase Auth logic
* Database RLS (Row Level Security)
* Frontend route protection

---

## 3. Authentication System

### 3.1 Login Page

**Fields:**

* Email
* Password

**Features:**

* Show / Hide password (eye icon toggle)
* Forgot Password (Supabase reset email)
* Client-side validation
* Error & success feedback
* Smooth entrance animation

---

### 3.2 Sign-Up Page

**Fields:**

* Full Name
* Phone Number
* Email
* Password

**Features:**

* Show / Hide password (eye icon toggle)
* Auto role assignment (Admin/User)
* Phone & email validation
* Animated form transitions

**Post Sign-Up:**

* Create profile row in database
* Redirect to role-based dashboard

---

## 4. User-Side Pages & Features

### 4.1 Home Page

**Purpose:** Brand introduction + analytics insight

**Core Features:**

* Hero section (AI-focused message)
* Animated counters
* **Website visitor tracking**

  * Track total visits
  * Track unique users
  * Store in Supabase table
* Smooth scroll animations

---

### 4.2 Projects Page

**Purpose:** Showcase AI & automation work

**Project Fields:**

* Title
* Description
* Media Upload

  * Images
  * Videos
* Project URL (external link)
* PDF upload (optional)
* FAQs (optional, dynamic question/answer pairs stored as JSONB)
* Rating system (⭐ 1–5)
* Like button
* Comment system

**User Interactions:**

* Like a project (1 per user)
* Rate a project
* Add text comments

**UI Expectations:**

* Card-based layout
* Hover effects
* Media lightbox modal
* Smooth animations

---

### 4.3 About Page

**Purpose:** Company & personal brand story

**Content:**

* About Code Wave AI
* Founder background
* Skills & technologies
* Animated sections

---

### 4.4 Contact Page

**Purpose:** Lead generation & communication

**Features:**

* Contact form (name, email, message)
* Supabase storage
* Email notification (future enhancement)
* Success animation

---

## 5. Admin Panel

### 5.1 Admin Access Rules

* Only Admin role can access
* Protected routes
* Server-side & client-side validation

---

### 5.2 Project Management

**Admin Capabilities:**

* Create project
* Edit project
* Delete project
* Upload multiple images & videos
* Add/edit/remove FAQ entries per project

**Advanced UI Requirement:**

* **Dual-image frame effect**

  * Two images displayed in one frame
  * Hover reveal / eye-catching animation
* Animated media previews
* Drag-and-drop uploads

---

### 5.3 Team Manager

**Admin Capabilities:**

* Add / Edit / Delete team members
* Fields: Profile picture, Full Name, Bio only
* Displayed on About page

**Simplified Design:**

* No role/position, email, social links, or display order fields in the form
* Cards show picture, name, bio + edit/delete actions

---

### 5.4 Admin Settings

**Admin Profile Management:**

* Full name
* Profile picture
* Bio / short description
* **Social Links:**

  * Facebook profile URL
  * LinkedIn profile URL
  * GitHub profile URL

**Capabilities:**

* Update personal admin profile
* Control visibility of social links on public pages
* View basic user activity (read-only)
* Prepare for future site-wide settings

---

## 6. Animations & UI Guidelines

### 6.1 Animation Principles

* Use animations to **enhance**, not distract
* Prefer:

  * Framer Motion
  * GSAP (optional)

### 6.2 UI Style

* Clean, modern, tech-focused
* Dark mode friendly
* Glassmorphism / soft shadows
* Responsive on all screen sizes

---

## 7. Database Structure (High-Level)

### Core Tables

* `profiles`
* `projects`
* `project_media`
* `project_likes`
* `project_ratings`
* `project_comments`
* `site_visits`
* `contact_messages`
* `team_members`
* `skills`

All tables must enforce **RLS policies**.

---

## 8. Security & Best Practices

* Supabase Auth
* RLS everywhere
* No admin logic only on frontend
* Environment variables for secrets
* Input sanitization

---

## 9. Scalability & Future Enhancements

Planned expansions:

* AI voice chatbot demo
* Automation dashboards
* Blog / case studies
* Subscription plans
* Analytics dashboard

---

## 10. Guiding Principles

* Performance first
* Clean code
* Scalable architecture
* Professional UX
* AI-first mindset

---

**This constitution defines the foundation of the Code Wave AI platform and must be followed throughout development.**
