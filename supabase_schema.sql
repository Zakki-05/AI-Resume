-- Create a resumes table
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  resume_id TEXT NOT NULL, -- This is our client-side ID
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to only see their own resumes
CREATE POLICY "Users can only access their own resumes" ON resumes
  FOR ALL USING (auth.uid() = user_id);

-- Add a unique constraint on user_id and resume_id to avoid duplicates
ALTER TABLE resumes ADD CONSTRAINT unique_user_resume UNIQUE (user_id, resume_id);
