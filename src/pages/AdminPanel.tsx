import React, { useState, useEffect } from 'react';
import { useElections } from '@/hooks/useElections';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ElectionForm from '@/components/admin/ElectionForm';
import ElectionsList from '@/components/admin/ElectionsList';
import CandidateManager from '@/components/admin/CandidateManager';
import VoterManager from '@/components/admin/VoterManager';
import VoteViewer from '@/components/admin/VoteViewer';
import ElectionSettings from '@/components/admin/ElectionSettings';
import AdminAuth from '@/components/AdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Vote, Settings, BarChart3, LogOut, Plus, Calendar, User, Activity } from 'lucide-react';
import { Election } from '@/hooks/useElections';

type AdminView = 'dashboard' | 'candidates' | 'voters' | 'votes' | 'settings';

const AdminPanel = () => {
  const { elections, loading, fetchElections } = useElections();
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState({
    totalElections: 0,
    activeElections: 0,
    totalVoters: 0,
    totalVotes: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    const adminAuth = localStorage.getItem('admin_authenticated');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (elections.length > 0) {
      setStats(prev => ({
        ...prev,
        totalElections: elections.length,
        activeElections: elections.filter(e => e.is_active).length
      }));
    }
  }, [elections]);

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setSelectedElection(null);
    setCurrentView('dashboard');
    toast({
      title: "Logged Out",
      description: "You have been logged out from admin panel",
    });
  };

  const handleCreateElection = async (electionData: {
    title: string;
    description: string;
    election_code: string;
    start_date: string;
    end_date: string;
  }) => {
    try {
      console.log('Creating election with data:', electionData);
      
      const { data, error } = await supabase
        .from('elections')
        .insert({
          title: electionData.title,
          description: electionData.description || null,
          election_code: electionData.election_code.toUpperCase(),
          start_date: electionData.start_date,
          end_date: electionData.end_date,
          is_active: true
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Election created successfully:', data);
      return true;
    } catch (error: any) {
      console.error('Error creating election:', error);
      
      let errorMessage = "Failed to create election. Please try again.";
      
      if (error.code === '23505') {
        errorMessage = "An election with this code already exists. Please use a different code.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Failed to Create Election",
        description: errorMessage,
        variant: "destructive",
      });
      
      return false;
    }
  };

  const handleDeleteElection = async (electionId: string) => {
    try {
      await supabase
        .from('candidates')
        .delete()
        .eq('election_id', electionId);

      await supabase
        .from('votes')
        .delete()
        .eq('election_id', electionId);

      const { error } = await supabase
        .from('elections')
        .delete()
        .eq('id', electionId);

      if (error) throw error;

      fetchElections();
      toast({
        title: "Success",
        description: "Election deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting election:', error);
      toast({
        title: "Error",
        description: "Failed to delete election",
        variant: "destructive",
      });
    }
  };

  const handleBackToDashboard = () => {
    setSelectedElection(null);
    setCurrentView('dashboard');
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  if (selectedElection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
          <CandidateManager 
            election={selectedElection} 
            onBack={handleBackToDashboard} 
          />
        </div>
      </div>
    );
  }

  if (currentView !== 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
          {currentView === 'voters' && <VoterManager onBack={handleBackToDashboard} />}
          {currentView === 'votes' && <VoteViewer onBack={handleBackToDashboard} />}
          {currentView === 'settings' && <ElectionSettings onBack={handleBackToDashboard} />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Election Admin Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Manage elections, candidates, voters, and monitor voting activity</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 shadow-sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Elections</p>
                  <p className="text-3xl font-bold">{stats.totalElections}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active Elections</p>
                  <p className="text-3xl font-bold">{stats.activeElections}</p>
                </div>
                <Activity className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Voters</p>
                  <p className="text-3xl font-bold">{stats.totalVoters}</p>
                </div>
                <User className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Total Votes</p>
                  <p className="text-3xl font-bold">{stats.totalVotes}</p>
                </div>
                <Vote className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white hover:bg-blue-50" onClick={() => setCurrentView('voters')}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Voter Management</h3>
                    <p className="text-sm text-gray-600">Verify and manage voter registrations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white hover:bg-green-50" onClick={() => setCurrentView('votes')}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Vote Analytics</h3>
                    <p className="text-sm text-gray-600">Monitor votes and view results</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white hover:bg-purple-50" onClick={() => setCurrentView('settings')}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                    <Settings className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Election Settings</h3>
                    <p className="text-sm text-gray-600">Configure election parameters</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Plus className="h-5 w-5 text-blue-600" />
                  Create New Election
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Set up a new election with candidates and voting parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ElectionForm 
                  onElectionCreated={fetchElections}
                  onCreateElection={handleCreateElection}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Elections Management
                  <Badge variant="secondary" className="ml-2">
                    {elections.length} total
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Manage existing elections and their settings
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ElectionsList 
                  elections={elections}
                  onDeleteElection={handleDeleteElection}
                  onSelectElection={setSelectedElection}
                  loading={loading}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
