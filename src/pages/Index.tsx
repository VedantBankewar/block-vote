
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, BarChart3, Zap, Lock, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeatureCard from '@/components/FeatureCard';
import StatsGrid from '@/components/StatsGrid';
import TestimonialCard from '@/components/TestimonialCard';

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Every vote is cryptographically secured and recorded on an immutable blockchain ledger.',
      color: 'text-blue-600',
      bgColor: 'from-blue-500 to-blue-600',
      darkBgColor: 'from-blue-600 to-blue-700'
    },
    {
      icon: Lock,
      title: 'Hardware Wallet Support',
      description: 'Enhanced security with Ledger hardware wallet integration for vote signing.',
      color: 'text-green-600',
      bgColor: 'from-green-500 to-green-600',
      darkBgColor: 'from-green-600 to-green-700'
    },
    {
      icon: BarChart3,
      title: 'Real-time Results',
      description: 'Watch election results update in real-time as votes are cast and verified.',
      color: 'text-purple-600',
      bgColor: 'from-purple-500 to-purple-600',
      darkBgColor: 'from-purple-600 to-purple-700'
    },
    {
      icon: Users,
      title: 'Transparent Verification',
      description: 'All votes are publicly verifiable while maintaining voter privacy and anonymity.',
      color: 'text-orange-600',
      bgColor: 'from-orange-500 to-orange-600',
      darkBgColor: 'from-orange-600 to-orange-700'
    },
    {
      icon: Zap,
      title: 'Fast & Efficient',
      description: 'Lightning-fast vote processing with minimal gas fees and instant confirmation.',
      color: 'text-yellow-600',
      bgColor: 'from-yellow-500 to-yellow-600',
      darkBgColor: 'from-yellow-600 to-yellow-700'
    },
    {
      icon: Globe,
      title: 'Multi-language Support',
      description: 'Available in multiple languages including English and Hindi for global accessibility.',
      color: 'text-indigo-600',
      bgColor: 'from-indigo-500 to-indigo-600',
      darkBgColor: 'from-indigo-600 to-indigo-700'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Verified Voters', icon: Users, color: 'text-blue-600' },
    { number: '50+', label: 'Elections Held', icon: BarChart3, color: 'text-green-600' },
    { number: '99.9%', label: 'Uptime', icon: Shield, color: 'text-purple-600' },
    { number: '100%', label: 'Transparency', icon: CheckCircle, color: 'text-orange-600' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Election Official',
      quote: 'BlockVote has revolutionized how we conduct elections. The transparency and security are unmatched.',
      avatar: 'SJ',
      rating: 5,
      index: 0
    },
    {
      name: 'Michael Chen',
      role: 'Voter',
      quote: 'I love how easy it is to vote securely from anywhere. The hardware wallet integration gives me peace of mind.',
      avatar: 'MC',
      rating: 5,
      index: 1
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Democracy Advocate',
      quote: 'This platform represents the future of democratic participation. Secure, transparent, and accessible to all.',
      avatar: 'PS',
      rating: 5,
      index: 2
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%227%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Powered by Blockchain Technology</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              The Future of Voting is Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Experience secure, transparent, and tamper-proof elections with blockchain technology. 
              Vote with confidence using hardware wallet security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/voter">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg">
                  Start Voting Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <StatsGrid stats={stats} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6">
              Why Choose BlockVote?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our platform combines cutting-edge blockchain technology with user-friendly design 
              to deliver the most secure and transparent voting experience possible.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with BlockVote in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform">
                  1
                </div>
                <CardTitle>Register & Verify</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Create your account and complete the verification process to ensure election integrity.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform">
                  2
                </div>
                <CardTitle>Connect Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Connect your MetaMask or Ledger hardware wallet for maximum security when voting.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform">
                  3
                </div>
                <CardTitle>Vote Securely</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Cast your vote with confidence knowing it's secured by blockchain technology.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6">
              What People Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who trust BlockVote for secure elections
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Ready to Experience Secure Voting?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join the revolution in democratic participation. Create your account today and be part of the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/voter">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/admin">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4">
                Admin Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
