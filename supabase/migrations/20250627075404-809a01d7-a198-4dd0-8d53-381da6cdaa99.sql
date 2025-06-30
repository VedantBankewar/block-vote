
-- Create a voters table to track voter registrations and verification status
CREATE TABLE public.voters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  id_number TEXT NOT NULL UNIQUE,
  wallet_address TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on voters table
ALTER TABLE public.voters ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert voter registrations
CREATE POLICY "Anyone can register as voter" 
  ON public.voters 
  FOR INSERT 
  WITH CHECK (true);

-- Policy to allow anyone to view voters (for admin verification)
CREATE POLICY "Anyone can view voters" 
  ON public.voters 
  FOR SELECT 
  USING (true);

-- Policy to allow updates for verification
CREATE POLICY "Allow voter verification updates" 
  ON public.voters 
  FOR UPDATE 
  USING (true);

-- Create a view to show vote details with candidate and voter information
CREATE VIEW public.vote_details AS
SELECT 
  v.id,
  v.created_at,
  v.transaction_hash,
  v.voter_wallet_address,
  c.name as candidate_name,
  c.party as candidate_party,
  e.title as election_title,
  e.election_code,
  vt.full_name as voter_name,
  vt.email as voter_email
FROM votes v
JOIN candidates c ON v.candidate_id = c.id
JOIN elections e ON v.election_id = e.id
LEFT JOIN voters vt ON v.voter_wallet_address = vt.wallet_address;

-- Add constraint to votes table to ensure only verified voters can vote
-- First, add a function to check if voter is verified
CREATE OR REPLACE FUNCTION check_voter_verified()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the voter exists and is verified
  IF NOT EXISTS (
    SELECT 1 FROM public.voters 
    WHERE wallet_address = NEW.voter_wallet_address 
    AND is_verified = true
  ) THEN
    RAISE EXCEPTION 'Voter must be verified before casting a vote';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to check voter verification before allowing votes
CREATE TRIGGER verify_voter_before_vote
  BEFORE INSERT ON public.votes
  FOR EACH ROW
  EXECUTE FUNCTION check_voter_verified();
