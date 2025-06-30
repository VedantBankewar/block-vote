
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Settings, Save } from 'lucide-react';
import { useElections } from '@/hooks/useElections';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ElectionSettingsProps {
  onBack: () => void;
}

const ElectionSettings: React.FC<ElectionSettingsProps> = ({ onBack }) => {
  const { elections, fetchElections } = useElections();
  const [selectedElection, setSelectedElection] = useState<string>('');
  const [settings, setSettings] = useState({
    isActive: true,
    allowMultipleVotes: false,
    requireVerification: true,
    maxVotesPerCandidate: 1
  });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleElectionSelect = async (electionId: string) => {
    setSelectedElection(electionId);
    const election = elections.find(e => e.id === electionId);
    if (election) {
      setSettings({
        isActive: election.is_active,
        allowMultipleVotes: false,
        requireVerification: true,
        maxVotesPerCandidate: 1
      });
    }
  };

  const handleSaveSettings = async () => {
    if (!selectedElection) {
      toast({
        title: "No Election Selected",
        description: "Please select an election to configure",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('elections')
        .update({
          is_active: settings.isActive,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedElection);

      if (error) throw error;

      await fetchElections();
      toast({
        title: "Settings Updated",
        description: "Election settings have been saved successfully",
      });
    } catch (error) {
      console.error('Error updating election settings:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update election settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Election Settings</h2>
          <p className="text-gray-600">Configure election parameters and settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Election Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Select Election
            </CardTitle>
            <CardDescription>
              Choose an election to configure its settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="election-select">Election</Label>
              <select
                id="election-select"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedElection}
                onChange={(e) => handleElectionSelect(e.target.value)}
              >
                <option value="">Select an election...</option>
                {elections.map((election) => (
                  <option key={election.id} value={election.id}>
                    {election.title} ({election.election_code})
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Settings Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Election Configuration</CardTitle>
            <CardDescription>
              Modify election behavior and access settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedElection ? (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="is-active">Election Active</Label>
                    <p className="text-sm text-gray-500">Enable or disable voting for this election</p>
                  </div>
                  <Switch
                    id="is-active"
                    checked={settings.isActive}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, isActive: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="require-verification">Require Verification</Label>
                    <p className="text-sm text-gray-500">Only verified voters can participate</p>
                  </div>
                  <Switch
                    id="require-verification"
                    checked={settings.requireVerification}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, requireVerification: checked }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="max-votes">Max Votes Per Candidate</Label>
                  <Input
                    id="max-votes"
                    type="number"
                    min="1"
                    value={settings.maxVotesPerCandidate}
                    onChange={(e) => 
                      setSettings(prev => ({ 
                        ...prev, 
                        maxVotesPerCandidate: parseInt(e.target.value) || 1 
                      }))
                    }
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Maximum number of votes allowed per candidate (future feature)
                  </p>
                </div>

                <Button 
                  onClick={handleSaveSettings}
                  className="w-full"
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Settings'}
                </Button>
              </>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Please select an election to configure its settings
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ElectionSettings;
