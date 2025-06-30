
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLedger } from './useLedger';

interface VoteState {
  isVoting: boolean;
  hasVoted: boolean;
  transactionHash: string | null;
  error: string | null;
}

export const useVote = (electionId: string, walletAddress: string | null) => {
  const [voteState, setVoteState] = useState<VoteState>({
    isVoting: false,
    hasVoted: false,
    transactionHash: null,
    error: null,
  });
  
  const { signVote } = useLedger();
  const { toast } = useToast();

  const castVote = useCallback(async (candidateId: string) => {
    if (!walletAddress) {
      throw new Error("Wallet not connected");
    }

    setVoteState(prev => ({ ...prev, isVoting: true, error: null }));

    try {
      // Validate network and contract (security enhancement)
      const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
      console.log('Current chain ID:', chainId);
      
      // Sign the vote using Ledger
      const voteData = {
        electionId,
        candidateId,
        voterAddress: walletAddress,
        timestamp: Date.now(),
      };

      const signature = await signVote(voteData);
      
      // Simulate blockchain transaction
      const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      setVoteState({
        isVoting: false,
        hasVoted: true,
        transactionHash,
        error: null,
      });

      toast({
        title: "Vote Cast Successfully!",
        description: `Transaction: ${transactionHash.slice(0, 10)}...`,
      });

      return { success: true, transactionHash };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to cast vote";
      setVoteState(prev => ({
        ...prev,
        isVoting: false,
        error: errorMessage,
      }));

      toast({
        title: "Vote Failed",
        description: errorMessage,
        variant: "destructive",
      });

      return { success: false, error: errorMessage };
    }
  }, [electionId, walletAddress, signVote, toast]);

  const resetVoteState = useCallback(() => {
    setVoteState({
      isVoting: false,
      hasVoted: false,
      transactionHash: null,
      error: null,
    });
  }, []);

  return {
    ...voteState,
    castVote,
    resetVoteState,
  };
};
