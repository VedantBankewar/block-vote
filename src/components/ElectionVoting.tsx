
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Election, useElections } from '@/hooks/useElections';
import { useLedger } from '@/hooks/useLedger';
import { useVote } from '@/hooks/useVote';
import VoteConfirmationModal from './VoteConfirmationModal';
import LedgerConnectionModal from './LedgerConnectionModal';
import ElectionHeader from './voting/ElectionHeader';
import ConnectionStatus from './voting/ConnectionStatus';
import VotingSection from './voting/VotingSection';
import LoadingSpinner from './LoadingSpinner';
import StatusIndicator from './StatusIndicator';

interface ElectionVotingProps {
  election: Election;
  onBack: () => void;
  walletAddress: string | null;
  isWalletConnected: boolean;
  onConnectWallet: () => void;
}

const ElectionVoting: React.FC<ElectionVotingProps> = ({ 
  election, 
  onBack, 
  walletAddress, 
  isWalletConnected, 
  onConnectWallet 
}) => {
  const [selectedCandidateName, setSelectedCandidateName] = useState<string>('');
  const [showLedgerModal, setShowLedgerModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [hasCheckedVoteStatus, setHasCheckedVoteStatus] = useState(false);
  
  const { candidates, loading, fetchCandidates, checkIfVoted } = useElections();
  const { isConnected: isLedgerConnected, isConnecting, connectLedger, error: ledgerError } = useLedger();
  const { isVoting, hasVoted, transactionHash, castVote, error: voteError } = useVote(election.id, walletAddress);

  useEffect(() => {
    fetchCandidates(election.id);
  }, [election.id]);

  useEffect(() => {
    if (walletAddress && !hasCheckedVoteStatus) {
      checkIfVoted(election.id, walletAddress).then(() => {
        setHasCheckedVoteStatus(true);
      });
    }
  }, [election.id, walletAddress, hasCheckedVoteStatus]);

  const isElectionActive = () => {
    const now = new Date();
    const startDate = new Date(election.start_date);
    const endDate = new Date(election.end_date);
    return now >= startDate && now <= endDate;
  };

  const handleVote = async (candidateId: string, candidateName: string) => {
    if (!walletAddress) {
      return;
    }

    if (!isLedgerConnected) {
      setShowLedgerModal(true);
      return;
    }

    console.log('Casting vote for candidate:', candidateName);
    setSelectedCandidateName(candidateName);
    
    const result = await castVote(candidateId);
    
    if (result.success && result.transactionHash) {
      setShowConfirmationModal(true);
      // Refresh candidates to update vote counts
      await fetchCandidates(election.id);
    }
  };

  const handleLedgerConnect = async () => {
    const address = await connectLedger();
    if (address) {
      setShowLedgerModal(false);
    }
  };

  if (loading && candidates.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8">
          <LoadingSpinner text="Loading election data..." />
        </CardContent>
      </Card>
    );
  }

  if (candidates.length === 0 && !loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8">
          <StatusIndicator
            status="warning"
            title="No Candidates Found"
            description="This election doesn't have any candidates yet. Please contact the administrator."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <ElectionHeader election={election} onBack={onBack} />
        
        <ConnectionStatus
          isWalletConnected={isWalletConnected}
          isLedgerConnected={isLedgerConnected}
          isElectionActive={isElectionActive()}
          onConnectWallet={onConnectWallet}
        />

        {voteError && (
          <StatusIndicator
            status="error"
            title="Voting Error"
            description={voteError}
          />
        )}

        {ledgerError && (
          <StatusIndicator
            status="error"
            title="Hardware Wallet Error"
            description={ledgerError}
          />
        )}

        <VotingSection
          candidates={candidates}
          hasVoted={hasVoted}
          transactionHash={transactionHash}
          isVoting={isVoting}
          isWalletConnected={isWalletConnected}
          isElectionActive={isElectionActive()}
          onVote={handleVote}
        />
      </div>

      {/* Modals */}
      <LedgerConnectionModal
        isOpen={showLedgerModal}
        onClose={() => setShowLedgerModal(false)}
        isConnecting={isConnecting}
        onConnect={handleLedgerConnect}
        error={ledgerError}
      />

      <VoteConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        transactionHash={transactionHash || ''}
        candidateName={selectedCandidateName}
      />
    </>
  );
};

export default ElectionVoting;
