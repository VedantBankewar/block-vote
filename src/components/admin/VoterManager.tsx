
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Users, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Voter {
  id: string;
  email: string;
  full_name: string;
  id_number: string;
  wallet_address: string | null;
  is_verified: boolean;
  verified_at: string | null;
  created_at: string;
}

interface VoterManagerProps {
  onBack: () => void;
}

const VoterManager: React.FC<VoterManagerProps> = ({ onBack }) => {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchVoters = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('voters')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVoters(data || []);
    } catch (error) {
      console.error('Error fetching voters:', error);
      toast({
        title: "Error",
        description: "Failed to fetch voters",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyVoter = async (voterId: string) => {
    try {
      const { error } = await supabase
        .from('voters')
        .update({
          is_verified: true,
          verified_at: new Date().toISOString()
        })
        .eq('id', voterId);

      if (error) throw error;

      fetchVoters();
      toast({
        title: "Success",
        description: "Voter verified successfully",
      });
    } catch (error) {
      console.error('Error verifying voter:', error);
      toast({
        title: "Error",
        description: "Failed to verify voter",
        variant: "destructive",
      });
    }
  };

  const handleRejectVoter = async (voterId: string) => {
    try {
      const { error } = await supabase
        .from('voters')
        .update({
          is_verified: false,
          verified_at: null
        })
        .eq('id', voterId);

      if (error) throw error;

      fetchVoters();
      toast({
        title: "Success", 
        description: "Voter verification revoked",
      });
    } catch (error) {
      console.error('Error rejecting voter:', error);
      toast({
        title: "Error",
        description: "Failed to update voter status",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchVoters();
  }, []);

  const pendingVoters = voters.filter(voter => !voter.is_verified);
  const verifiedVoters = voters.filter(voter => voter.is_verified);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Voter Management
              </CardTitle>
              <CardDescription>
                Verify voter registrations and manage voter status
              </CardDescription>
            </div>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin Panel
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{voters.length}</div>
            <p className="text-sm text-gray-600">Total Registered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">{pendingVoters.length}</div>
            <p className="text-sm text-gray-600">Pending Verification</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{verifiedVoters.length}</div>
            <p className="text-sm text-gray-600">Verified Voters</p>
          </CardContent>
        </Card>
      </div>

      {pendingVoters.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Verifications ({pendingVoters.length})</CardTitle>
            <CardDescription>These voters are waiting for verification</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>ID Number</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingVoters.map((voter) => (
                  <TableRow key={voter.id}>
                    <TableCell className="font-medium">{voter.full_name}</TableCell>
                    <TableCell>{voter.email}</TableCell>
                    <TableCell>{voter.id_number}</TableCell>
                    <TableCell>{new Date(voter.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleVerifyVoter(voter.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verify
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Voters ({voters.length})</CardTitle>
          <CardDescription>Complete list of registered voters</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading voters...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>ID Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verified Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {voters.map((voter) => (
                  <TableRow key={voter.id}>
                    <TableCell className="font-medium">{voter.full_name}</TableCell>
                    <TableCell>{voter.email}</TableCell>
                    <TableCell>{voter.id_number}</TableCell>
                    <TableCell>
                      <Badge variant={voter.is_verified ? "default" : "secondary"}>
                        {voter.is_verified ? "Verified" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {voter.verified_at ? new Date(voter.verified_at).toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell>
                      {voter.is_verified ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRejectVoter(voter.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Revoke
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleVerifyVoter(voter.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verify
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VoterManager;
