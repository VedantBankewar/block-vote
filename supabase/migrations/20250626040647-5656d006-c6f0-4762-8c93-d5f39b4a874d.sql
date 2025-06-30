
-- Add RLS policies for the elections table to allow admin operations
-- Policy to allow anyone to read elections (public voting access)
CREATE POLICY "Anyone can view active elections" 
  ON public.elections 
  FOR SELECT 
  USING (is_active = true);

-- Policy to allow insertion of new elections (for admin functionality)
CREATE POLICY "Allow election creation" 
  ON public.elections 
  FOR INSERT 
  WITH CHECK (true);

-- Policy to allow updating elections (for admin functionality)
CREATE POLICY "Allow election updates" 
  ON public.elections 
  FOR UPDATE 
  USING (true);

-- Policy to allow deleting elections (for admin functionality)  
CREATE POLICY "Allow election deletion" 
  ON public.elections 
  FOR DELETE 
  USING (true);

-- Also add policies for candidates table
CREATE POLICY "Anyone can view candidates" 
  ON public.candidates 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow candidate creation" 
  ON public.candidates 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow candidate updates" 
  ON public.candidates 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Allow candidate deletion" 
  ON public.candidates 
  FOR DELETE 
  USING (true);

-- And for votes table
CREATE POLICY "Anyone can view votes" 
  ON public.votes 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow vote creation" 
  ON public.votes 
  FOR INSERT 
  WITH CHECK (true);
