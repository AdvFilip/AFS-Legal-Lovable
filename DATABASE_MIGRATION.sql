-- AFS Legal Advocates Database Migration
-- This migration creates/updates the advocates table with all SOP fields

-- Drop existing advocates table if starting fresh
-- DROP TABLE IF EXISTS advocates CASCADE;

-- Create advocates table with complete schema
CREATE TABLE IF NOT EXISTS advocates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity (Part A.1)
  full_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  designation TEXT NOT NULL, -- Partner, Senior Associate, Associate, Of Counsel
  location TEXT NOT NULL, -- City
  enrollment_no TEXT NOT NULL, -- Bar Council enrollment number
  languages TEXT[] DEFAULT ARRAY[]::TEXT[],

  -- Practice (Part A.2)
  primary_practice TEXT NOT NULL, -- Corporate & Commercial / Dispute Resolution / etc
  secondary_practices TEXT[] DEFAULT ARRAY[]::TEXT[],
  industries TEXT[] DEFAULT ARRAY[]::TEXT[],
  years_practice INT,

  -- Credentials (Part A.3)
  education JSONB DEFAULT '[]'::JSONB, -- [{degree, institution, year}]
  memberships TEXT[] DEFAULT ARRAY[]::TEXT[],
  publications TEXT[] DEFAULT ARRAY[]::TEXT[], -- Up to 5

  -- Experience Highlights (Part A.4)
  highlights TEXT[] DEFAULT ARRAY[]::TEXT[], -- Anonymised matters (3-5)

  -- Contact (Part A.5)
  email TEXT NOT NULL,
  linkedin_url TEXT,

  -- Profile Photo (Part A.6)
  photo_url TEXT, -- Cloud Storage URL

  -- Display Order (Part A.8)
  seniority_rank INT DEFAULT 999, -- 1=Partner, 2=Senior Associate, 3=Associate, 4=Of Counsel
  joined_on DATE,

  -- Status & Metadata
  status TEXT DEFAULT 'draft', -- draft / published / archived
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT valid_status CHECK (status IN ('draft', 'published', 'archived')),
  CONSTRAINT valid_designation CHECK (designation IN ('Partner', 'Senior Associate', 'Associate', 'Of Counsel')),
  CONSTRAINT valid_seniority CHECK (seniority_rank BETWEEN 1 AND 999)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS advocates_status_idx ON advocates(status);
CREATE INDEX IF NOT EXISTS advocates_seniority_idx ON advocates(seniority_rank, joined_on, full_name);
CREATE INDEX IF NOT EXISTS advocates_slug_idx ON advocates(slug);

-- Create user_roles table for RLS (if not exists)
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'viewer', -- 'viewer', 'editor', 'admin'
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT valid_role CHECK (role IN ('viewer', 'editor', 'admin'))
);

-- Enable RLS on both tables
ALTER TABLE advocates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Public can SELECT only published advocates
CREATE POLICY IF NOT EXISTS advocates_public_select
  ON advocates FOR SELECT
  USING (status = 'published');

-- RLS Policy: Authenticated admin users can do everything
CREATE POLICY IF NOT EXISTS advocates_admin_all
  ON advocates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('editor', 'admin')
    )
  );

-- RLS Policy: Authenticated users can see their own drafts
CREATE POLICY IF NOT EXISTS advocates_own_drafts
  ON advocates FOR SELECT
  USING (
    status = 'draft' AND
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('editor', 'admin')
    )
  );

-- RLS Policy: user_roles are managed by admin only
CREATE POLICY IF NOT EXISTS user_roles_admin_only
  ON user_roles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Insert initial data from SOP (A. Filip Shenan & N. Siva)
INSERT INTO advocates (
  full_name, slug, designation, location, enrollment_no, languages,
  primary_practice, secondary_practices, industries, years_practice,
  education, memberships, highlights,
  email, linkedin_url,
  status, seniority_rank, joined_on
) VALUES
(
  'A. Filip Shenan',
  'a-filip-shenan',
  'Partner',
  'Tiruchirappalli',
  'TN-BAR-XXXX', -- Update with actual enrollment
  ARRAY['English', 'Tamil'],
  'Dispute Resolution & Litigation',
  ARRAY['Property & Real Estate', 'Business & Commercial Advisory'],
  ARRAY['Real Estate', 'Agriculture & Agribusiness', 'MSMEs'],
  25,
  '[{"degree":"LLB (Hons)","institution":"University","year":1998},{"degree":"PGDEC","institution":"College","year":2000}]'::JSONB,
  ARRAY['Bar Council', 'ICA'],
  ARRAY[
    'Advised corporate client on multi-party property dispute involving ₹5Cr+ valuation',
    'Led criminal defense in complex white-collar matter across 3-year appellate process',
    'Structured business advisory for MSME involving regulatory compliance and restructuring'
  ],
  'support@afslegal.in',
  'https://linkedin.com/in/afilip',
  'published',
  1,
  '2000-01-01'::DATE
),
(
  'N. Siva',
  'n-siva',
  'Senior Associate',
  'Tiruchirappalli',
  'TN-BAR-YYYY', -- Update with actual enrollment
  ARRAY['English', 'Tamil'],
  'Dispute Resolution & Litigation',
  ARRAY['Consumer Rights'],
  ARRAY['Individuals & Families', 'MSMEs'],
  12,
  '[{"degree":"B.L.","institution":"Law School","year":2010},{"degree":"B.Sc.","institution":"University","year":2008}]'::JSONB,
  ARRAY['Bar Council', 'Consumer Rights Association'],
  ARRAY[
    'Handled 50+ consumer commission matters with 85% favorable outcomes',
    'Led litigation team for product liability case involving multinational brand',
    'Advised on criminal defense in financial fraud matter'
  ],
  'support@afslegal.in',
  'https://linkedin.com/in/nsiva',
  'published',
  2,
  '2012-01-01'::DATE
);

-- Add created/updated trigger (optional but recommended)
CREATE OR REPLACE FUNCTION update_advocates_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER advocates_update_timestamp
  BEFORE UPDATE ON advocates
  FOR EACH ROW
  EXECUTE FUNCTION update_advocates_timestamp();

-- Verify setup
SELECT 'Advocates table created successfully' as status;
SELECT COUNT(*) as total_advocates FROM advocates;
SELECT COUNT(*) as published_advocates FROM advocates WHERE status = 'published';
