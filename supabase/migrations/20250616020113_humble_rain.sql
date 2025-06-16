/*
  # Create User Profiles and Call Protection Tables

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `phone_number` (text)
      - `protection_enabled` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `blocked_calls`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `phone_number` (text)
      - `blocked_at` (timestamp)
      - `reason` (text)
      - `call_type` (text)
    
    - `allowed_calls`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `phone_number` (text)
      - `allowed_at` (timestamp)
      - `reason` (text)
    
    - `spam_database`
      - `id` (uuid, primary key)
      - `phone_number` (text, unique)
      - `spam_type` (text)
      - `confidence_score` (integer)
      - `reported_count` (integer, default 1)
      - `last_reported` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add policies for spam database read access
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  phone_number text,
  protection_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blocked_calls table
CREATE TABLE IF NOT EXISTS blocked_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  phone_number text NOT NULL,
  blocked_at timestamptz DEFAULT now(),
  reason text NOT NULL,
  call_type text DEFAULT 'spam'
);

-- Create allowed_calls table
CREATE TABLE IF NOT EXISTS allowed_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  phone_number text NOT NULL,
  allowed_at timestamptz DEFAULT now(),
  reason text DEFAULT 'verified'
);

-- Create spam_database table
CREATE TABLE IF NOT EXISTS spam_database (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text UNIQUE NOT NULL,
  spam_type text NOT NULL DEFAULT 'robocall',
  confidence_score integer DEFAULT 85 CHECK (confidence_score >= 0 AND confidence_score <= 100),
  reported_count integer DEFAULT 1,
  last_reported timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE allowed_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE spam_database ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policies for blocked_calls
CREATE POLICY "Users can read own blocked calls"
  ON blocked_calls
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own blocked calls"
  ON blocked_calls
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create policies for allowed_calls
CREATE POLICY "Users can read own allowed calls"
  ON allowed_calls
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own allowed calls"
  ON allowed_calls
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own allowed calls"
  ON allowed_calls
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for spam_database (read-only for users)
CREATE POLICY "Users can read spam database"
  ON spam_database
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blocked_calls_user_id ON blocked_calls(user_id);
CREATE INDEX IF NOT EXISTS idx_blocked_calls_phone_number ON blocked_calls(phone_number);
CREATE INDEX IF NOT EXISTS idx_blocked_calls_blocked_at ON blocked_calls(blocked_at);

CREATE INDEX IF NOT EXISTS idx_allowed_calls_user_id ON allowed_calls(user_id);
CREATE INDEX IF NOT EXISTS idx_allowed_calls_phone_number ON allowed_calls(phone_number);

CREATE INDEX IF NOT EXISTS idx_spam_database_phone_number ON spam_database(phone_number);
CREATE INDEX IF NOT EXISTS idx_spam_database_confidence_score ON spam_database(confidence_score);

-- Create function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile
DROP TRIGGER IF EXISTS create_user_profile_trigger ON auth.users;
CREATE TRIGGER create_user_profile_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for user_profiles updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();