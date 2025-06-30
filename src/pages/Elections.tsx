
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin, Clock, Vote } from 'lucide-react';

const Elections = () => {
  const activeElections = [
    {
      id: 1,
      title: "2024 Presidential Election",
      description: "National election to choose the next President of the United States",
      startDate: "2024-11-05",
      endDate: "2024-11-05",
      status: "Active",
      participants: 245000000,
      location: "Nationwide",
      type: "Presidential"
    },
    {
      id: 2,
      title: "California Gubernatorial Election",
      description: "State election for Governor of California",
      startDate: "2024-11-05",
      endDate: "2024-11-05",
      status: "Active",
      participants: 22000000,
      location: "California",
      type: "State"
    },
    {
      id: 3,
      title: "New York City Mayoral Election",
      description: "Municipal election for Mayor of New York City",
      startDate: "2024-11-05",
      endDate: "2024-11-05",
      status: "Upcoming",
      participants: 6500000,
      location: "New York City",
      type: "Municipal"
    }
  ];

  const completedElections = [
    {
      id: 4,
      title: "2024 Primary Elections",
      description: "Primary elections for various federal and state positions",
      startDate: "2024-03-15",
      endDate: "2024-06-15",
      status: "Completed",
      participants: 89000000,
      location: "Nationwide",
      type: "Primary"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Elections
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Participate in secure, transparent elections powered by blockchain technology. 
            Your vote matters, and with BlockVote, every vote is verified and immutable.
          </p>
        </div>
      </section>

      {/* Active Elections */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Active Elections
          </h2>
          <div className="grid gap-6">
            {activeElections.map((election) => (
              <Card key={election.id} className="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {election.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 text-lg">
                        {election.description}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(election.status)}>
                      {election.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatDate(election.startDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Eligible Voters</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatNumber(election.participants)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {election.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {election.type}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Link to="/voter">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        <Vote className="mr-2 h-4 w-4" />
                        Vote Now
                      </Button>
                    </Link>
                    <Link to="/results">
                      <Button variant="outline">
                        View Results
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Completed Elections */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Completed Elections
          </h2>
          <div className="grid gap-6">
            {completedElections.map((election) => (
              <Card key={election.id} className="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-0 shadow-lg opacity-80">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {election.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 text-lg">
                        {election.description}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(election.status)}>
                      {election.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Period</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatDate(election.startDate)} - {formatDate(election.endDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Participants</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatNumber(election.participants)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {election.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {election.type}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Link to="/results">
                      <Button variant="outline">
                        View Final Results
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Elections;
