
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Election {
  id: string;
  election_code: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface Candidate {
  id: string;
  election_id: string;
  name: string;
  party: string;
  image_url: string | null;
  votes: number;
}

export interface Vote {
  id: string;
  election_id: string;
  candidate_id: string;
  voter_wallet_address: string;
  transaction_hash: string | null;
}

export const useElections = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchElections = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('elections')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setElections(data || []);
    } catch (error) {
      console.error('Error fetching elections:', error);
      toast({
        title: "Error",
        description: "Failed to fetch elections",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchElectionByCode = async (electionCode: string): Promise<Election | null> => {
    try {
      const { data, error } = await supabase
        .from('elections')
        .select('*')
        .eq('election_code', electionCode.toUpperCase())
        .eq('is_active', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No election found
        }
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error fetching election by code:', error);
      return null;
    }
  };

  const fetchCandidates = async (electionId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('election_id', electionId)
        .order('name');

      if (error) throw error;
      setCandidates(data || []);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      toast({
        title: "Error",
        description: "Failed to fetch candidates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const castVote = async (electionId: string, candidateId: string, walletAddress: string, transactionHash?: string) => {
    try {
      // Check if user has already voted
      const { data: existingVote } = await supabase
        .from('votes')
        .select('id')
        .eq('election_id', electionId)
        .eq('voter_wallet_address', walletAddress)
        .single();

      if (existingVote) {
        toast({
          title: "Already Voted",
          description: "You have already voted in this election",
          variant: "destructive",
        });
        return false;
      }

      // Insert the vote
      const { error } = await supabase
        .from('votes')
        .insert({
          election_id: electionId,
          candidate_id: candidateId,
          voter_wallet_address: walletAddress,
          transaction_hash: transactionHash || null
        });

      if (error) throw error;

      // Update candidate vote count manually
      const { data: candidate, error: fetchError } = await supabase
        .from('candidates')
        .select('votes')
        .eq('id', candidateId)
        .single();

      if (fetchError) {
        console.error('Error fetching candidate votes:', fetchError);
      } else {
        const { error: updateError } = await supabase
          .from('candidates')
          .update({ votes: candidate.votes + 1 })
          .eq('id', candidateId);

        if (updateError) {
          console.error('Error updating vote count:', updateError);
        }
      }

      return true;
    } catch (error) {
      console.error('Error casting vote:', error);
      toast({
        title: "Vote Failed",
        description: "Failed to cast your vote. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const checkIfVoted = async (electionId: string, walletAddress: string): Promise<boolean> => {
    try {
      const { data } = await supabase
        .from('votes')
        .select('id')
        .eq('election_id', electionId)
        .eq('voter_wallet_address', walletAddress)
        .single();

      return !!data;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  return {
    elections,
    candidates,
    loading,
    fetchElections,
    fetchElectionByCode,
    fetchCandidates,
    castVote,
    checkIfVoted
  };
};
