
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Trophy, Users, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const Results = () => {
  const [selectedElection, setSelectedElection] = useState('presidential');

  const presidentialResults = {
    title: "2024 Presidential Election",
    status: "Live Results",
    totalVotes: 245789432,
    reportingPrecincts: 87,
    candidates: [
      { name: "John Smith", party: "Democratic", votes: 98345612, percentage: 40.0, color: "#3B82F6" },
      { name: "Sarah Johnson", party: "Republican", votes: 89234567, percentage: 36.3, color: "#EF4444" },
      { name: "Mike Wilson", party: "Independent", votes: 45678234, percentage: 18.6, color: "#10B981" },
      { name: "Lisa Brown", party: "Green", votes: 12531019, percentage: 5.1, color: "#F59E0B" }
    ]
  };

  const stateResults = {
    title: "California Gubernatorial Election",
    status: "Final Results",
    totalVotes: 18456789,
    reportingPrecincts: 100,
    candidates: [
      { name: "Maria Garcia", party: "Democratic", votes: 9876543, percentage: 53.5, color: "#3B82F6" },
      { name: "Robert Lee", party: "Republican", votes: 7234567, percentage: 39.2, color: "#EF4444" },
      { name: "Anna Davis", party: "Independent", votes: 1345679, percentage: 7.3, color: "#10B981" }
    ]
  };

  const getCurrentResults = () => {
    return selectedElection === 'presidential' ? presidentialResults : stateResults;
  };

  const results = getCurrentResults();

  const chartData = results.candidates.map(candidate => ({
    name: candidate.name,
    votes: candidate.votes,
    percentage: candidate.percentage
  }));

  const COLORS = results.candidates.map(candidate => candidate.color);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Election Results
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real-time, transparent election results powered by blockchain technology. 
            Every vote is verified and publicly auditable.
          </p>
        </div>
      </section>

      {/* Election Selector */}
      <section className="px-4 mb-8">
        <div className="container mx-auto">
          <Tabs value={selectedElection} onValueChange={setSelectedElection} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="presidential">Presidential</TabsTrigger>
              <TabsTrigger value="state">State Elections</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Results Overview */}
      <section className="px-4 mb-8">
        <div className="container mx-auto">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {results.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                    Blockchain-verified election results
                  </CardDescription>
                </div>
                <Badge className={results.status === 'Live Results' ? 
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 animate-pulse' : 
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }>
                  {results.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Votes</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatNumber(results.totalVotes)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Precincts Reporting</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {results.reportingPrecincts}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Turnout</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      72.4%
                    </p>
                  </div>
                </div>
              </div>
              
              <Progress value={results.reportingPrecincts} className="h-3 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                {results.reportingPrecincts}% of precincts reporting
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Candidate Results */}
      <section className="px-4 mb-8">
        <div className="container mx-auto">
          <div className="grid gap-4">
            {results.candidates.map((candidate, index) => (
              <Card key={candidate.name} className="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      {index === 0 && (
                        <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {candidate.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {candidate.party} Party
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {candidate.percentage}%
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatNumber(candidate.votes)} votes
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={candidate.percentage} 
                    className="h-3"
                    style={{ '--progress-foreground': candidate.color } as React.CSSProperties}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="px-4 mb-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <Card className="bg-white dark:bg-gray-800 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Vote Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [formatNumber(value), 'Votes']} />
                    <Bar dataKey="votes" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card className="bg-white dark:bg-gray-800 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Vote Percentage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }: any) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blockchain Verification */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold mb-4">
                Blockchain Verified Results
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                All votes have been cryptographically verified and recorded on the immutable blockchain ledger. 
                These results are publicly auditable and tamper-proof.
              </p>
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                View Blockchain Records
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Results;
