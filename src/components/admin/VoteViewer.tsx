
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Vote, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface VoteDetail {
  id: string;
  created_at: string;
  transaction_hash: string | null;
  voter_wallet_address: string;
  candidate_name: string;
  candidate_party: string;
  election_title: string;
  election_code: string;
  voter_name: string | null;
  voter_email: string | null;
}

interface VoteViewerProps {
  onBack: () => void;
}

const VoteViewer: React.FC<VoteViewerProps> = ({ onBack }) => {
  const [votes, setVotes] = useState<VoteDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchVotes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vote_details')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVotes(data || []);
    } catch (error) {
      console.error('Error fetching votes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch vote details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  const groupedByElection = votes.reduce((acc, vote) => {
    const key = vote.election_code;
    if (!acc[key]) {
      acc[key] = {
        election_title: vote.election_title,
        election_code: vote.election_code,
        votes: []
      };
    }
    acc[key].votes.push(vote);
    return acc;
  }, {} as Record<string, { election_title: string; election_code: string; votes: VoteDetail[] }>);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5" />
                Vote Analytics
              </CardTitle>
              <CardDescription>
                View all cast votes and voting analytics
              </CardDescription>
            </div>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin Panel
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="text-2xl font-bold">{votes.length}</div>
          <p className="text-sm text-gray-600">Total Votes Cast</p>
        </CardContent>
      </Card>

      {Object.entries(groupedByElection).map(([electionCode, electionData]) => (
        <Card key={electionCode}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div>
                {electionData.election_title}
                <Badge variant="outline" className="ml-2">{electionCode}</Badge>
              </div>
              <Badge variant="secondary">{electionData.votes.length} votes</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Voter</TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Party</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Wallet Address</TableHead>
                  <TableHead>Transaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {electionData.votes.map((vote) => (
                  <TableRow key={vote.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{vote.voter_name || 'Anonymous'}</p>
                        {vote.voter_email && (
                          <p className="text-sm text-gray-500">{vote.voter_email}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{vote.candidate_name}</TableCell>
                    <TableCell>{vote.candidate_party}</TableCell>
                    <TableCell>
                      {new Date(vote.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {vote.voter_wallet_address.slice(0, 6)}...{vote.voter_wallet_address.slice(-4)}
                      </code>
                    </TableCell>
                    <TableCell>
                      {vote.transaction_hash ? (
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {vote.transaction_hash.slice(0, 8)}...
                        </code>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      {loading && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-pulse">Loading vote data...</div>
          </CardContent>
        </Card>
      )}

      {!loading && votes.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No votes have been cast yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VoteViewer;
