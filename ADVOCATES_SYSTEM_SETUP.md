# 🎯 Advocates Management System — Complete Setup Guide

## Overview

Complete advocates/team member management system built for AFS Legal with:
- ✅ Database-driven (Supabase via Lovable Cloud)
- ✅ Admin interface at `/admin/advocates`
- ✅ SOP-compliant intake email & form
- ✅ Public team page from database
- ✅ RLS (Row-Level Security) for public/admin access
- ✅ Status workflow: draft → published → archived

---

## 📋 What's Included

### Database Files
- **DATABASE_MIGRATION.sql** — Complete SQL schema with:
  - `advocates` table (with all SOP fields)
  - `user_roles` table (for RLS)
  - RLS policies
  - Indexes for performance
  - Initial data (A. Filip Shenan & N. Siva)

### Code Files
1. **src/lib/advocates.ts** — Types & utilities
2. **src/components/afs/AdvocateForm.tsx** — Admin form component
3. **src/routes/admin.advocates.tsx** — Admin page (`/admin/advocates`)
4. **src/routes/team.tsx** — Updated team page (queries database)
5. **src/routes/api.advocates.published.ts** — API endpoint

### SOP
- **PART A: Intake Email** — Use `PART_A_INTAKE_EMAIL.txt` (in this project)
- **PART B: Workflow** — Database-driven (this implementation)

---

## 🚀 Setup Steps

### Step 1: Run Database Migration

In Lovable Cloud's SQL Editor:

1. Go to your project's **Database** panel
2. Click **SQL Editor**
3. Paste entire contents of `DATABASE_MIGRATION.sql`
4. Execute the migration
5. Verify tables created:
   - ✅ `advocates` table with columns
   - ✅ `user_roles` table
   - ✅ RLS policies active

### Step 2: Test Initial Data

After migration, verify data:

```sql
SELECT * FROM advocates WHERE status = 'published';
-- Should show: A. Filip Shenan & N. Siva
```

### Step 3: Verify RLS Policies

```sql
SELECT * FROM pg_policies WHERE tablename = 'advocates';
-- Should show 3 policies:
-- - advocates_public_select
-- - advocates_admin_all
-- - advocates_own_drafts
```

### Step 4: Deploy to Lovable

1. **Pull the new code** into Lovable (or copy files manually)
2. **Key new files:**
   - `src/lib/advocates.ts` — Types
   - `src/components/afs/AdvocateForm.tsx` — Admin form
   - `src/routes/admin.advocates.tsx` — Admin page
   - `src/routes/team.tsx` — Updated (database-driven)

3. **Update imports** in `src/components/afs/index.ts`:
   ```typescript
   export { AdvocateForm } from './AdvocateForm';
   ```

### Step 5: Test Admin Page

1. Navigate to: `https://your-domain.com/admin/advocates`
2. Should see:
   - List of advocates (published, draft, archived)
   - Add/Edit form
   - Publish/Unpublish buttons
3. Try creating a new advocate to test form

### Step 6: Verify Team Page

1. Navigate to: `https://your-domain.com/team`
2. Should see:
   - Published advocates from database
   - Sorted by seniority, join date, name
   - Full details, photos, highlights

---

## 📧 Using the Intake Email

### Send to New Advocates:

**Email Template** (see `PART A — Advocate Intake Email` in project)

Reply structure:
```
1. Identity
2. Practice
3. Credentials
4. Experience Highlights
5. Contact
6. Profile Photo
7. Consent
8. Display Order Preference
```

### Then in Admin:

1. Go to `/admin/advocates`
2. Click **"Add New Advocate"** tab
3. Fill form with email data:
   - Copy identity info → Part A.1
   - Copy practice info → Part A.2
   - Etc.
4. Upload photo from email (or use Cloud Storage URL)
5. Save as **Draft**
6. Preview on staging
7. Click **"Publish"** when ready

---

## 🔐 Security & Access Control

### RLS Policies (Row-Level Security)

**Public Users** can:
- ✅ View published advocates (on `/team` page)
- ❌ Cannot see draft/archived
- ❌ Cannot edit/delete

**Authenticated Admins** can:
- ✅ View all advocates (published, draft, archived)
- ✅ Create, edit, delete advocates
- ✅ Publish/unpublish

### How to Set Up Admin Access:

1. In Lovable/Supabase, create user with admin role:
```sql
INSERT INTO user_roles (user_id, role)
VALUES ('user-uuid-here', 'admin');
```

2. Admin logs in via authentication
3. Only then can access `/admin/advocates`

---

## 📊 Database Schema

### advocates Table

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key |
| `full_name` | TEXT | Required |
| `slug` | TEXT UNIQUE | URL slug |
| `designation` | TEXT | Partner, Senior Associate, etc. |
| `location` | TEXT | City |
| `enrollment_no` | TEXT | Bar Council number |
| `languages` | TEXT[] | Array of languages |
| `primary_practice` | TEXT | Main practice area |
| `secondary_practices` | TEXT[] | Up to 3 |
| `industries` | TEXT[] | Sectors served |
| `years_practice` | INT | Experience |
| `education` | JSONB | [{degree, institution, year}] |
| `memberships` | TEXT[] | Bar associations, etc. |
| `publications` | TEXT[] | Up to 5 |
| `highlights` | TEXT[] | Anonymized matters (3-5) |
| `email` | TEXT | Contact email |
| `linkedin_url` | TEXT | Profile URL |
| `photo_url` | TEXT | Cloud storage URL |
| `seniority_rank` | INT | 1=Partner, 2=Senior, etc. |
| `joined_on` | DATE | Join date (for sorting) |
| `status` | TEXT | draft / published / archived |
| `created_at` | TIMESTAMPTZ | Auto-created |
| `updated_at` | TIMESTAMPTZ | Auto-updated |

### user_roles Table

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Authenticated user |
| `role` | TEXT | viewer / editor / admin |
| `created_at` | TIMESTAMPTZ | Auto-created |

---

## 🔄 Publishing Workflow

### Timeline: Weekly Mondays

1. **Intake** (Mon-Fri)
   - Send intake email to new advocate
   - Receive completed form

2. **Validation** (Fri-Mon)
   - Check all 8 sections complete
   - Chase missing items if needed

3. **Upload** (Mon morning)
   - Create draft in admin
   - Upload photo to Cloud Storage
   - Fill all fields from intake email

4. **Review** (Mon 10am-12pm)
   - Editorial team reviews draft
   - Check tone, spelling, anonymization
   - Test profile rendering

5. **Publish** (Mon 1pm)
   - Click "Publish" button
   - Team page updates immediately
   - Advocate live on production

6. **Archive** (Anytime)
   - When advocate leaves
   - Click "Archive" (soft delete)
   - Preserves historical data

---

## 🛠️ Admin Page Features

### List View
- Shows all advocates with counts
- Filter by status (Published/Draft/Archived)
- Edit or Publish/Unpublish buttons
- Quick access to advocate details

### Form View
- All 8 intake sections organized
- Real-time validation
- Auto-slug generation from name
- Auto-seniority from designation
- Array fields (languages, industries, highlights)
- Education entries with degree/institution/year
- Status selector (draft/published/archived)

### Status Workflow
- **Draft** → Not visible to public (for editorial review)
- **Published** → Shows on /team page
- **Archived** → Hidden but preserved (for history)

---

## 📱 Mobile & Responsive

✅ Team page responsive on:
- Mobile (375px) — Single column
- Tablet (768px) — Grid layout  
- Desktop (1920px) — Premium layout

✅ Admin form responsive:
- Full form on desktop
- Stacked on mobile
- Touch-friendly inputs

---

## 🐛 Troubleshooting

### Issue: `/admin/advocates` returns 404

**Solution:**
- Verify file `src/routes/admin.advocates.tsx` exists
- Check Lovable recognized the route
- Try refreshing browser cache

### Issue: Team page shows "Loading..." forever

**Solution:**
- Check API endpoint: `/api/advocates/published`
- Verify database query working in SQL editor
- Check RLS policy allows public SELECT

### Issue: Can't publish advocate

**Solution:**
- Verify user has admin role in `user_roles` table
- Check RLS policies are active
- Try refreshing authentication

### Issue: Photos not showing

**Solution:**
- Verify URL is from Cloud Storage (public)
- Check image exists at URL
- Try different image format (JPEG/PNG)

---

## 📝 Sample Advocate Data

```
Name: A. Filip Shenan
Designation: Partner
Location: Tiruchirappalli
Enrollment: TN-BAR-XXXX
Languages: English, Tamil
Primary Practice: Dispute Resolution & Litigation
Years Practice: 25
Education:
  - LLB (Hons) — University — 1998
  - PGDEC — College — 2000
Memberships: Bar Council, ICA
Highlights:
  - Advised corporate on multi-party property dispute (₹5Cr+)
  - Led criminal defense in 3-year appellate matter
  - Structured MSME advisory on regulatory compliance
Email: support@afslegal.in
LinkedIn: https://linkedin.com/in/afilip
Photo: [From Cloud Storage]
Status: Published
Seniority Rank: 1 (Partner)
Joined: 2000-01-01
```

---

## 🚀 Deployment

### Local Testing

1. Database migration run ✅
2. Admin page loads ✅
3. Create test advocate ✅
4. Publish and verify on team page ✅

### Production Deploy

1. Merge to main branch
2. Lovable auto-deploys
3. Database queries live
4. Admin page accessible
5. Team page shows published advocates

---

## 📞 Support & Maintenance

### Weekly Tasks

- **Monday 9am:** Check admin for new submissions
- **Monday 10am-12pm:** Editorial review
- **Monday 1pm:** Publish approved advocates

### Monthly Tasks

- Review RLS policies working
- Backup advocates table
- Archive graduated/left advocates

### Ongoing

- Monitor admin page performance
- Handle photo uploads
- Process intake emails
- Update advocate info as needed

---

## 🎯 Next Steps

1. ✅ Run DATABASE_MIGRATION.sql
2. ✅ Deploy code to Lovable
3. ✅ Set up admin user in user_roles table
4. ✅ Test `/admin/advocates` page
5. ✅ Verify `/team` page queries database
6. ✅ Send first intake email to test advocate
7. ✅ Create, review, and publish test advocate
8. ✅ Go live!

---

**Complete advocates management system ready for production.** 🎉

