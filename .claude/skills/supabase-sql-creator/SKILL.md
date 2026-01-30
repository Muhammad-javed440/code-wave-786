---
name: supabase-sql-creator
description: Generate complete Supabase database schemas including tables, types, RLS policies, triggers, and functions. Use when (1) Setting up a new Supabase project database, (2) Creating tables with proper relationships and constraints, (3) Implementing Row Level Security (RLS) policies, (4) Creating database triggers and functions, (5) Adding authentication-related database setup, (6) Any request mentioning "create database", "supabase schema", "RLS policies", "database triggers", or "supabase SQL".
---

# Supabase SQL Creator

Generate complete, production-ready Supabase database schemas with tables, RLS policies, triggers, and functions.

## Workflow

### Step 1: Gather Requirements

Before generating SQL, understand the project needs:

**Required information:**
- What tables are needed?
- What are the relationships between tables?
- Who should access what data? (public, authenticated, admin-only)
- Are there admin users? What emails?
- What authentication flow? (email, OAuth, phone)

**Ask if unclear:**
- "What tables do you need for your project?"
- "What user roles exist? (e.g., admin, user, moderator)"
- "Which admin emails should have elevated access?"
- "Should users be able to read/write each other's data?"

### Step 2: Define Data Types

Create custom types first before tables that use them.

**Common patterns:**
```sql
-- User roles
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('ADMIN', 'USER', 'MODERATOR');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Status types
DO $$ BEGIN
    CREATE TYPE status_type AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'DELETED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
```

### Step 3: Create Tables

Follow these patterns for table creation:

**Profiles table (linked to auth.users):**
```sql
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'USER',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Standard table with UUID primary key:**
```sql
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Junction table (many-to-many):**
```sql
CREATE TABLE IF NOT EXISTS project_members (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY(project_id, user_id)
);
```

**Table design checklist:**
- [ ] UUID primary keys (use `gen_random_uuid()`)
- [ ] Foreign keys with `ON DELETE CASCADE` or `SET NULL`
- [ ] `created_at` and `updated_at` timestamps
- [ ] NOT NULL constraints where appropriate
- [ ] UNIQUE constraints for unique fields
- [ ] Default values for optional fields

### Step 4: Enable Row Level Security

**CRITICAL: Always enable RLS on all tables.**

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
```

### Step 5: Create RLS Policies

Reference `references/rls-patterns.md` for detailed policy patterns.

**Common policy patterns:**

**Public read, authenticated write:**
```sql
-- Everyone can read
CREATE POLICY "Public read access" ON table_name
  FOR SELECT USING (true);

-- Users can update own records
CREATE POLICY "Users update own" ON table_name
  FOR UPDATE USING (auth.uid() = user_id);
```

**Admin-only access:**
```sql
CREATE POLICY "Admins can manage" ON table_name
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );
```

**Owner or admin access:**
```sql
CREATE POLICY "Owner or admin access" ON table_name
  FOR ALL USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );
```

### Step 6: Create Triggers and Functions

**Auto-create profile on signup (with admin emails):**
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    CASE
      WHEN NEW.email IN ('admin1@example.com', 'admin2@example.com')
      THEN 'ADMIN'::user_role
      ELSE 'USER'::user_role
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

**Auto-update timestamps:**
```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_timestamp
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### Step 7: Output Format

```sql
-- ================================================
-- PROJECT NAME - SUPABASE DATABASE SCHEMA
-- ================================================

-- 1. CUSTOM TYPES
-- 2. TABLES
-- 3. ENABLE RLS
-- 4. POLICIES
-- 5. FUNCTIONS & TRIGGERS
-- 6. INDEXES (optional)
```

## Common Table Templates

### Blog Posts
```sql
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Products (E-commerce)
```sql
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  inventory_count INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Comments
```sql
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Likes
```sql
CREATE TABLE IF NOT EXISTS likes (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY(user_id, post_id)
);
```

### Contact Messages
```sql
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Site Visits (Analytics)
```sql
CREATE TABLE IF NOT EXISTS site_visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT DEFAULT '/',
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Reference Files

- **`references/rls-patterns.md`**: Detailed RLS policy patterns for various access scenarios
- **`references/common-tables.md`**: Ready-to-use table definitions
- **`references/functions-triggers.md`**: Database functions and triggers

## Quick Reference

### Data Types
| Use Case | Type |
|----------|------|
| Primary Key | `UUID DEFAULT gen_random_uuid()` |
| Foreign Key | `UUID REFERENCES table(id)` |
| Text | `TEXT` |
| Number | `INTEGER`, `NUMERIC(10,2)` |
| Boolean | `BOOLEAN DEFAULT false` |
| Timestamp | `TIMESTAMPTZ DEFAULT NOW()` |
| JSON | `JSONB DEFAULT '{}'::jsonb` |
| Array | `TEXT[] DEFAULT '{}'` |

### RLS Quick Patterns
| Access Pattern | Policy |
|----------------|--------|
| Public read | `FOR SELECT USING (true)` |
| Auth only | `USING (auth.uid() IS NOT NULL)` |
| Own records | `USING (auth.uid() = user_id)` |
| Admin only | `USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN'))` |
