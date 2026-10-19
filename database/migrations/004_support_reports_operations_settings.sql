CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), requester_user_id uuid NULL REFERENCES user_accounts(id), community_id uuid NULL REFERENCES communities(id),
  category text NOT NULL, subject text NOT NULL, priority text NOT NULL DEFAULT 'normal', assigned_admin_id uuid NULL REFERENCES admin_users(id),
  status text NOT NULL DEFAULT 'new', related_entity_type text NULL, related_entity_id text NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_support_tickets_queue ON support_tickets(status, priority, updated_at DESC);
CREATE TABLE IF NOT EXISTS support_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), ticket_id uuid NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_type text NOT NULL, sender_id text NOT NULL, visibility text NOT NULL CHECK (visibility IN ('requester','internal')),
  body text NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_support_messages_ticket ON support_messages(ticket_id, created_at);

CREATE TABLE IF NOT EXISTS report_definitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), key text NOT NULL UNIQUE, name text NOT NULL, category text NOT NULL,
  allowed_fields text[] NOT NULL DEFAULT '{}', default_filters jsonb NOT NULL DEFAULT '{}', active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS report_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), report_definition_id uuid NOT NULL REFERENCES report_definitions(id),
  requested_by_admin_id uuid NOT NULL REFERENCES admin_users(id), filters jsonb NOT NULL DEFAULT '{}', status text NOT NULL DEFAULT 'queued',
  result_summary jsonb NULL, error_summary text NULL, created_at timestamptz NOT NULL DEFAULT now(), completed_at timestamptz NULL
);
CREATE TABLE IF NOT EXISTS export_artifacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), report_run_id uuid NOT NULL REFERENCES report_runs(id), requested_by_admin_id uuid NOT NULL REFERENCES admin_users(id),
  status text NOT NULL DEFAULT 'queued', storage_key text NULL, content_type text NULL, byte_size bigint NULL, expires_at timestamptz NULL,
  downloaded_at timestamptz NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_export_artifacts_owner ON export_artifacts(requested_by_admin_id, created_at DESC);

CREATE TABLE IF NOT EXISTS background_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), idempotency_key text NOT NULL UNIQUE, job_type text NOT NULL, payload jsonb NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'queued', attempts integer NOT NULL DEFAULT 0, max_attempts integer NOT NULL DEFAULT 5,
  available_at timestamptz NULL, error_summary text NULL, started_at timestamptz NULL, finished_at timestamptz NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_background_jobs_available ON background_jobs(status, available_at, created_at);

CREATE TABLE IF NOT EXISTS platform_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), category text NOT NULL, key text NOT NULL, value jsonb NOT NULL, version integer NOT NULL,
  updated_by_admin_id uuid NOT NULL REFERENCES admin_users(id), active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(category, key, version)
);
CREATE INDEX IF NOT EXISTS idx_platform_settings_active ON platform_settings(category, key, active);

CREATE TABLE IF NOT EXISTS mobile_config_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), platform text NOT NULL, audience text NOT NULL, schema_version integer NOT NULL,
  published_version integer NOT NULL, configuration jsonb NOT NULL, status text NOT NULL DEFAULT 'draft',
  published_by_admin_id uuid NULL REFERENCES admin_users(id), published_at timestamptz NULL, created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(platform, audience, published_version)
);
CREATE INDEX IF NOT EXISTS idx_mobile_config_published ON mobile_config_versions(platform, audience, status, published_version DESC);

ALTER TABLE admin_sessions ADD COLUMN IF NOT EXISTS last_activity_at timestamptz NULL;
ALTER TABLE outbox_events ADD COLUMN IF NOT EXISTS processed_at timestamptz NULL;
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS last_login_at timestamptz NULL;

INSERT INTO report_definitions(key, name, category, allowed_fields, default_filters)
VALUES
  ('food-rescue-summary', 'Food Rescue Summary', 'operations', ARRAY['listing_count','offered','reserved','collected','unavailable'], '{}'),
  ('community-participation', 'Community Participation', 'communities', ARRAY['community_count','active_communities','completed_pickups'], '{}'),
  ('safety-overview', 'Safety Overview', 'safety', ARRAY['incident_count','open_incidents','resolved_incidents'], '{}')
ON CONFLICT (key) DO NOTHING;
