
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Election } from '@/hooks/useElections';

interface ElectionHeaderProps {
  election: Election;
  onBack: () => void;
}

const ElectionHeader: React.FC<ElectionHeaderProps> = ({ election, onBack }) => {
  const isElectionActive = () => {
    const now = new Date();
    const startDate = new Date(election.start_date);
    const endDate = new Date(election.end_date);
    return now >= startDate && now <= endDate;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{election.title}</CardTitle>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-600">Election ID:</span>
              <Badge variant="outline">{election.election_code}</Badge>
            </div>
            {election.description && (
              <p className="text-gray-600 mt-2">{election.description}</p>
            )}
          </div>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="flex gap-4 text-sm text-gray-600 mt-4">
          <span>Start: {new Date(election.start_date).toLocaleDateString()}</span>
          <span>End: {new Date(election.end_date).toLocaleDateString()}</span>
          <Badge variant={isElectionActive() ? 'default' : 'secondary'}>
            {isElectionActive() ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ElectionHeader;
