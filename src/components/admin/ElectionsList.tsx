
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Calendar, Users, Settings } from 'lucide-react';
import { Election } from '@/hooks/useElections';

interface ElectionsListProps {
  elections: Election[];
  onDeleteElection: (id: string) => void;
  onSelectElection: (election: Election) => void;
  loading: boolean;
}

const ElectionsList: React.FC<ElectionsListProps> = ({ 
  elections, 
  onDeleteElection, 
  onSelectElection, 
  loading 
}) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-3 text-gray-500">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg">Loading elections...</span>
        </div>
      </div>
    );
  }

  if (elections.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No elections created yet</p>
        <p className="text-gray-400 text-sm">Create your first election to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {elections.map((election) => (
        <div 
          key={election.id} 
          className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-white hover:bg-gray-50 group"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                  {election.title}
                </h3>
                <Badge 
                  variant="outline" 
                  className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 border-blue-200"
                >
                  {election.election_code}
                </Badge>
                <Badge 
                  variant={election.is_active ? 'default' : 'secondary'}
                  className={`text-xs font-medium px-2 py-1 ${
                    election.is_active 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : 'bg-gray-100 text-gray-600 border-gray-200'
                  }`}
                >
                  {election.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              
              {election.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {election.description}
                </p>
              )}
              
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Start: {new Date(election.start_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>End: {new Date(election.end_date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelectElection(election)}
                className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Manage</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDeleteElection(election.id)}
                className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ElectionsList;
