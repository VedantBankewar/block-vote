import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Election, Candidate, useElections } from '@/hooks/useElections';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CandidateManagerProps {
  election: Election;
  onBack: () => void;
}

const CandidateManager: React.FC<CandidateManagerProps> = ({ election, onBack }) => {
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    party: '',
    image_url: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const { candidates, loading, fetchCandidates } = useElections();
  const { toast } = useToast();

  useEffect(() => {
    fetchCandidates(election.id);
  }, [election.id]);

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCandidate.name || !newCandidate.party) {
      toast({
        title: "Validation Error",
        description: "Please fill in candidate name and party",
        variant: "destructive",
      });
      return;
    }

    setIsAdding(true);
    try {
      const { error } = await supabase
        .from('candidates')
        .insert({
          election_id: election.id,
          name: newCandidate.name,
          party: newCandidate.party,
          image_url: newCandidate.image_url || null
        });

      if (error) throw error;

      setNewCandidate({ name: '', party: '', image_url: '' });
      fetchCandidates(election.id);
      toast({
        title: "Success",
        description: "Candidate added successfully",
      });
    } catch (error) {
      console.error('Error adding candidate:', error);
      toast({
        title: "Failed to Add Candidate",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteCandidate = async (candidateId: string) => {
    try {
      const { error } = await supabase
        .from('candidates')
        .delete()
        .eq('id', candidateId);

      if (error) throw error;

      fetchCandidates(election.id);
      toast({
        title: "Success",
        description: "Candidate removed successfully",
      });
    } catch (error) {
      console.error('Error removing candidate:', error);
      toast({
        title: "Error",
        description: "Failed to remove candidate",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manage Candidates - {election.title}</CardTitle>
              <CardDescription>
                Add and manage candidates for this election
              </CardDescription>
            </div>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Elections
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCandidate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="candidate_name">Candidate Name *</Label>
                <Input
                  id="candidate_name"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="candidate_party">Party *</Label>
                <Input
                  id="candidate_party"
                  value={newCandidate.party}
                  onChange={(e) => setNewCandidate(prev => ({ ...prev, party: e.target.value }))}
                  placeholder="Political party"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="candidate_image">Image URL</Label>
                <Input
                  id="candidate_image"
                  value={newCandidate.image_url}
                  onChange={(e) => setNewCandidate(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="Profile image URL"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isAdding}
            >
              <Plus className="h-4 w-4 mr-2" />
              {isAdding ? 'Adding...' : 'Add Candidate'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Candidates ({candidates.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading candidates...</div>
          ) : candidates.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No candidates added yet</p>
          ) : (
            <div className="space-y-3">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{candidate.name}</h4>
                    <p className="text-gray-600">{candidate.party}</p>
                    <p className="text-sm text-gray-500">Votes: {candidate.votes}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCandidate(candidate.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateManager;
