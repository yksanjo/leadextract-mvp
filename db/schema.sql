-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  encrypted_password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  company VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  subscription_status VARCHAR(50) DEFAULT 'free',
  subscription_tier VARCHAR(50), -- 'starter', 'pro', 'enterprise'
  trial_ends_at TIMESTAMP,
  exports_this_month INTEGER DEFAULT 0,
  monthly_export_limit INTEGER DEFAULT 1000, -- trial limit
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- LinkedIn sessions (encrypted)
CREATE TABLE linkedin_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  encrypted_cookie TEXT NOT NULL, -- AES-256 encrypted li_at cookie
  is_active BOOLEAN DEFAULT true,
  last_used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Scrape Jobs table
CREATE TABLE scrape_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  search_url TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, running, completed, failed
  total_results INTEGER,
  scraped_count INTEGER DEFAULT 0,
  error_message TEXT,
  metadata JSONB, -- Additional search parameters
  created_at TIMESTAMP DEFAULT NOW(),
  started_at TIMESTAMP,
  completed_at TIMESTAMP
);

-- Leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES scrape_jobs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  linkedin_url VARCHAR(500),
  full_name VARCHAR(255),
  headline TEXT,
  company_name VARCHAR(255),
  company_linkedin_url VARCHAR(500),
  location VARCHAR(255),
  profile_image_url TEXT,
  current_title VARCHAR(255),
  email VARCHAR(255), -- if found via email finder
  phone VARCHAR(50), -- if found
  connection_degree INTEGER,
  raw_data JSONB, -- Full profile data
  scraped_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, linkedin_url)
);

-- Export History
CREATE TABLE exports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  job_id UUID REFERENCES scrape_jobs(id),
  format VARCHAR(20), -- csv, xlsx, json
  record_count INTEGER,
  file_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- API Keys for enterprise tier
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  key_hash VARCHAR(255) NOT NULL, -- SHA256 of the key
  key_prefix VARCHAR(10), -- First 8 chars for identification
  name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  last_used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Usage tracking for rate limiting
CREATE TABLE api_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  api_key_id UUID REFERENCES api_keys(id) ON DELETE CASCADE,
  endpoint VARCHAR(100),
  response_status INTEGER,
  response_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe_customer_id ON users(stripe_customer_id);
CREATE INDEX idx_linkedin_sessions_user_id ON linkedin_sessions(user_id);
CREATE INDEX idx_scrape_jobs_user_id ON scrape_jobs(user_id);
CREATE INDEX idx_scrape_jobs_status ON scrape_jobs(status);
CREATE INDEX idx_leads_user_id ON leads(user_id);
CREATE INDEX idx_leads_job_id ON leads(job_id);
CREATE INDEX idx_exports_user_id ON exports(user_id);
CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX idx_api_usage_api_key_id ON api_usage(api_key_id);
CREATE INDEX idx_api_usage_created_at ON api_usage(created_at);

-- Row Level Security (RLS) policies will be added via Supabase dashboard
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE linkedin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE scrape_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_linkedin_sessions_updated_at BEFORE UPDATE ON linkedin_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to check export limits
CREATE OR REPLACE FUNCTION check_export_limit(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    current_export_count INTEGER;
    user_limit INTEGER;
    user_tier VARCHAR;
BEGIN
    SELECT exports_this_month, monthly_export_limit, subscription_tier
    INTO current_export_count, user_limit, user_tier
    FROM users WHERE id = user_uuid;

    -- Unlimited for pro and enterprise tiers
    IF user_tier IN ('pro', 'enterprise') THEN
        RETURN TRUE;
    END IF;

    -- Check limit for other tiers
    RETURN current_export_count < user_limit;
END;
$$ language 'plpgsql';