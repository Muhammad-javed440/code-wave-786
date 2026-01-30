# RLS Policy Patterns for Supabase

Comprehensive Row Level Security patterns for common access control scenarios.

## Basic Patterns

### Public Read Access
Anyone can read, including anonymous users.
```sql
CREATE POLICY "Public read" ON table_name
  FOR SELECT USING (true);
```

### Authenticated Read Only
Only logged-in users can read.
```sql
CREATE POLICY "Authenticated read" ON table_name
  FOR SELECT USING (auth.uid() IS NOT NULL);
```

### Owner Only Access
Users can only access their own records.
```sql
-- Read own records
CREATE POLICY "Read own" ON table_name
  FOR SELECT USING (auth.uid() = user_id);

-- Update own records
CREATE POLICY "Update own" ON table_name
  FOR UPDATE USING (auth.uid() = user_id);

-- Delete own records
CREATE POLICY "Delete own" ON table_name
  FOR DELETE USING (auth.uid() = user_id);

-- Insert with ownership
CREATE POLICY "Insert own" ON table_name
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## Role-Based Patterns

### Admin Full Access
Admins can perform all operations.
```sql
CREATE POLICY "Admin full access" ON table_name
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );
```

### Admin or Owner
Admins can access all, users can access own.
```sql
CREATE POLICY "Admin or owner" ON table_name
  FOR ALL USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );
```

### Multiple Roles
Different roles have different access levels.
```sql
-- Moderators can read and update
CREATE POLICY "Moderator access" ON table_name
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ADMIN', 'MODERATOR'))
  );

CREATE POLICY "Moderator update" ON table_name
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ADMIN', 'MODERATOR'))
  );

-- Only admins can delete
CREATE POLICY "Admin delete" ON table_name
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );
```

## Relationship-Based Patterns

### Team/Organization Access
Users can access records belonging to their team.
```sql
CREATE POLICY "Team access" ON projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = projects.team_id
      AND team_members.user_id = auth.uid()
    )
  );
```

### Hierarchical Access
Access based on parent-child relationships.
```sql
-- Access comments if user can access the post
CREATE POLICY "Comment access via post" ON comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = comments.post_id
      AND (posts.published = true OR posts.author_id = auth.uid())
    )
  );
```

## Conditional Patterns

### Published Content
Public can read only published content.
```sql
CREATE POLICY "Read published" ON posts
  FOR SELECT USING (
    published = true OR author_id = auth.uid()
  );
```

### Time-Based Access
Access based on date/time conditions.
```sql
CREATE POLICY "Active content only" ON promotions
  FOR SELECT USING (
    start_date <= NOW() AND end_date >= NOW()
  );
```

### Status-Based Access
Access based on record status.
```sql
CREATE POLICY "Active records" ON orders
  FOR SELECT USING (
    status != 'DELETED' AND
    (user_id = auth.uid() OR
     EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN'))
  );
```

## Insert Patterns

### Auto-Set User ID
Ensure user_id is set to current user on insert.
```sql
CREATE POLICY "Insert with auth" ON table_name
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### Anonymous Insert (Contact Forms)
Allow anyone to insert (e.g., contact messages).
```sql
CREATE POLICY "Anyone can insert" ON contact_messages
  FOR INSERT WITH CHECK (true);
```

### Authenticated Insert
Only logged-in users can insert.
```sql
CREATE POLICY "Auth insert" ON table_name
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
```

## Combined CRUD Policies

### Standard User Content Pattern
```sql
-- Everyone reads
CREATE POLICY "Public read" ON posts FOR SELECT USING (true);

-- Authors insert
CREATE POLICY "Auth insert" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Authors update own
CREATE POLICY "Author update" ON posts
  FOR UPDATE USING (auth.uid() = author_id);

-- Authors or admins delete
CREATE POLICY "Author or admin delete" ON posts
  FOR DELETE USING (
    auth.uid() = author_id OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );
```

### Private User Data Pattern
```sql
-- Only owner can read
CREATE POLICY "Owner read" ON user_settings
  FOR SELECT USING (auth.uid() = user_id);

-- Only owner can insert
CREATE POLICY "Owner insert" ON user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Only owner can update
CREATE POLICY "Owner update" ON user_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- Only owner can delete
CREATE POLICY "Owner delete" ON user_settings
  FOR DELETE USING (auth.uid() = user_id);
```

## Service Role Bypass

Allow service role to bypass RLS (for backend operations).
```sql
CREATE POLICY "Service role bypass" ON table_name
  FOR ALL USING (auth.role() = 'service_role');
```

## Best Practices

1. **Always enable RLS** on all tables
2. **Use `DROP POLICY IF EXISTS`** before creating to avoid conflicts
3. **Name policies descriptively** (who, what action)
4. **Test policies** with different user roles
5. **Use `EXISTS`** for subqueries (more efficient than `IN`)
6. **Keep policies simple** - complex logic in functions
7. **Document policies** in your schema file
