ALTER TABLE safety_incidents
  ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'food_safety',
  ADD COLUMN IF NOT EXISTS affected_listing_id uuid NULL REFERENCES food_listings(id),
  ADD COLUMN IF NOT EXISTS reporter_user_id uuid NULL REFERENCES user_accounts(id),
  ADD COLUMN IF NOT EXISTS assignee_admin_user_id uuid NULL REFERENCES admin_users(id),
  ADD COLUMN IF NOT EXISTS evidence jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS findings text NULL,
  ADD COLUMN IF NOT EXISTS resolution text NULL,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS resolved_at timestamptz NULL;
CREATE INDEX IF NOT EXISTS idx_safety_incidents_status_severity ON safety_incidents(status, severity);

CREATE TABLE IF NOT EXISTS volunteers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES user_accounts(id),
  community_id uuid NULL REFERENCES communities(id),
  approval_status text NOT NULL DEFAULT 'pending',
  training_status text NOT NULL DEFAULT 'not_started',
  status text NOT NULL DEFAULT 'active',
  reviewer_admin_user_id uuid NULL REFERENCES admin_users(id),
  review_reason text NULL,
  applied_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz NULL
);
CREATE INDEX IF NOT EXISTS idx_volunteers_approval_status ON volunteers(approval_status);

CREATE TABLE IF NOT EXISTS volunteer_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  community_id uuid NOT NULL REFERENCES communities(id),
  location_summary text NOT NULL,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  instructions text NULL,
  assigned_volunteer_id uuid NULL REFERENCES volunteers(id),
  status text NOT NULL DEFAULT 'unassigned',
  attendance_status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT volunteer_task_time_order CHECK (ends_at > starts_at)
);
CREATE INDEX IF NOT EXISTS idx_volunteer_tasks_schedule ON volunteer_tasks(starts_at, status);

CREATE TABLE IF NOT EXISTS notification_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  event_type text NOT NULL,
  channel text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  subject text NOT NULL,
  body text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(event_type, channel, language)
);

CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text NOT NULL,
  audience jsonb NOT NULL,
  channel text NOT NULL DEFAULT 'in_app',
  language text NOT NULL DEFAULT 'en',
  status text NOT NULL DEFAULT 'draft',
  created_by_admin_user_id uuid NULL REFERENCES admin_users(id),
  scheduled_at timestamptz NULL,
  published_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_announcements_status_schedule ON announcements(status, scheduled_at);

CREATE TABLE IF NOT EXISTS notification_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id uuid NOT NULL REFERENCES announcements(id),
  channel text NOT NULL,
  audience_size integer NOT NULL DEFAULT 0 CHECK (audience_size >= 0),
  sent_count integer NOT NULL DEFAULT 0 CHECK (sent_count >= 0),
  failed_count integer NOT NULL DEFAULT 0 CHECK (failed_count >= 0),
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS outbox_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key text NOT NULL UNIQUE,
  topic text NOT NULL,
  payload jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  attempts integer NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  next_attempt_at timestamptz NULL,
  last_error text NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_outbox_events_pending ON outbox_events(status, next_attempt_at, created_at);
