
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Vote, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ElectionSelectorProps {
  onElectionSelect: (electionCode: string) => void;
  loading?: boolean;
}

const ElectionSelector: React.FC<ElectionSelectorProps> = ({ onElectionSelect, loading }) => {
  const [electionCode, setElectionCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!electionCode.trim()) {
      setError('Please enter an election ID');
      return;
    }
    setError('');
    onElectionSelect(electionCode.trim().toUpperCase());
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <Vote className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <CardTitle className="text-2xl">Enter Election ID</CardTitle>
        <CardDescription>
          Enter the unique election ID provided by your administrator to access the ballot
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="electionCode">Election ID</Label>
            <Input
              id="electionCode"
              type="text"
              value={electionCode}
              onChange={(e) => setElectionCode(e.target.value)}
              placeholder="e.g., PRES2024"
              required
              className="uppercase"
            />
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Access Election'}
          </Button>
        </form>
        
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-600">
          <strong>Sample Election IDs:</strong><br />
          PRES2024 - Presidential Election 2024<br />
          LOCAL2024 - Local Elections 2024
        </div>
      </CardContent>
    </Card>
  );
};

export default ElectionSelector;
