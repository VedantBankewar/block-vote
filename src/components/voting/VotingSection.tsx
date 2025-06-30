
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader } from 'lucide-react';
import { Candidate } from '@/hooks/useElections';

interface VotingSectionProps {
  candidates: Candidate[];
  hasVoted: boolean;
  transactionHash: string | null;
  isVoting: boolean;
  isWalletConnected: boolean;
  isElectionActive: boolean;
  onVote: (candidateId: string, candidateName: string) => void;
}

const VotingSection: React.FC<VotingSectionProps> = ({
  candidates,
  hasVoted,
  transactionHash,
  isVoting,
  isWalletConnected,
  isElectionActive,
  onVote,
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const handleVote = () => {
    if (!selectedCandidate) return;
    const candidate = candidates.find(c => c.id === selectedCandidate);
    if (candidate) {
      onVote(selectedCandidate, candidate.name);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidates</CardTitle>
        <CardDescription>
          {hasVoted 
            ? "You have already voted in this election" 
            : "Select your preferred candidate and cast your vote"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasVoted ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-600 mb-2">Vote Confirmed</h3>
            <p className="text-gray-600">Your vote has been recorded on the blockchain and cannot be changed.</p>
            {transactionHash && (
              <p className="text-xs text-gray-500 mt-2">
                Transaction: {transactionHash.slice(0, 10)}...
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <label className="flex items-center space-x-4 cursor-pointer">
                  <input
                    type="radio"
                    name="candidate"
                    value={candidate.id}
                    checked={selectedCandidate === candidate.id}
                    onChange={() => setSelectedCandidate(candidate.id)}
                    className="w-4 h-4 text-blue-600"
                    disabled={!isWalletConnected || !isElectionActive || hasVoted || isVoting}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{candidate.name}</h3>
                    <p className="text-gray-600">{candidate.party}</p>
                    <p className="text-sm text-gray-500">Current votes: {candidate.votes}</p>
                  </div>
                </label>
              </div>
            ))}
            
            <div className="pt-4">
              <Button
                onClick={handleVote}
                disabled={!isWalletConnected || !isElectionActive || !selectedCandidate || isVoting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isVoting ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Casting Vote...
                  </>
                ) : (
                  'Cast Vote'
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VotingSection;
