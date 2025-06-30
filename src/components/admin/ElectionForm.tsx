
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ElectionFormProps {
  onElectionCreated: () => void;
  onCreateElection: (election: {
    title: string;
    description: string;
    election_code: string;
    start_date: string;
    end_date: string;
  }) => Promise<boolean>;
}

const ElectionForm: React.FC<ElectionFormProps> = ({ onElectionCreated, onCreateElection }) => {
  const [newElection, setNewElection] = useState({
    title: '',
    description: '',
    election_code: '',
    start_date: '',
    end_date: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateElection = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newElection.title || !newElection.election_code || !newElection.start_date || !newElection.end_date) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      const success = await onCreateElection(newElection);
      if (success) {
        setNewElection({
          title: '',
          description: '',
          election_code: '',
          start_date: '',
          end_date: ''
        });
        onElectionCreated();
        toast({
          title: "Success",
          description: "Election created successfully",
        });
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      toast({
        title: "Failed to Create Election",
        description: "Please check your input and try again. Make sure the election code is unique.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form onSubmit={handleCreateElection} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-gray-700">
          Election Title *
        </Label>
        <Input
          id="title"
          value={newElection.title}
          onChange={(e) => setNewElection(prev => ({ ...prev, title: e.target.value }))}
          placeholder="e.g., Presidential Election 2024"
          className="border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium text-gray-700">
          Description
        </Label>
        <Textarea
          id="description"
          value={newElection.description}
          onChange={(e) => setNewElection(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description of the election"
          className="border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[80px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="election_code" className="text-sm font-medium text-gray-700">
          Election Code *
        </Label>
        <Input
          id="election_code"
          value={newElection.election_code}
          onChange={(e) => setNewElection(prev => ({ ...prev, election_code: e.target.value.toUpperCase() }))}
          placeholder="e.g., PRES2024"
          className="uppercase border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          maxLength={20}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start_date" className="text-sm font-medium text-gray-700">
            Start Date *
          </Label>
          <Input
            id="start_date"
            type="datetime-local"
            value={newElection.start_date}
            onChange={(e) => setNewElection(prev => ({ ...prev, start_date: e.target.value }))}
            className="border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="end_date" className="text-sm font-medium text-gray-700">
            End Date *
          </Label>
          <Input
            id="end_date"
            type="datetime-local"
            value={newElection.end_date}
            onChange={(e) => setNewElection(prev => ({ ...prev, end_date: e.target.value }))}
            className="border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
        disabled={isCreating}
      >
        {isCreating ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Creating...
          </div>
        ) : (
          'Create Election'
        )}
      </Button>
    </form>
  );
};

export default ElectionForm;
