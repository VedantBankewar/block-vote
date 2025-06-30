
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, Lock, Globe, CheckCircle, Zap } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Every vote is cryptographically secured and recorded on an immutable blockchain ledger, ensuring complete transparency and preventing tampering."
    },
    {
      icon: Users,
      title: "Democratic Participation",
      description: "Enabling secure, accessible voting for all eligible citizens while maintaining the integrity of the democratic process."
    },
    {
      icon: Lock,
      title: "Privacy Protection",
      description: "Advanced zero-knowledge proofs protect voter privacy while still allowing for public verification of election results."
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Vote from anywhere in the world with just an internet connection, making elections more accessible to all citizens."
    },
    {
      icon: CheckCircle,
      title: "Instant Verification",
      description: "Real-time vote verification and tallying with publicly auditable results that anyone can independently verify."
    },
    {
      icon: Zap,
      title: "Efficient Process",
      description: "Streamlined voting process that reduces costs, eliminates manual counting errors, and provides immediate results."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About BlockVote
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            BlockVote is revolutionizing democracy through secure, transparent, and decentralized voting technology. 
            Built on blockchain infrastructure, we ensure every vote counts, every vote is verified, and every vote is immutable.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Card className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                To democratize access to secure voting while maintaining the highest standards of election integrity. 
                We believe that every citizen deserves a voice in their democracy, and blockchain technology provides 
                the perfect foundation for transparent, tamper-proof elections that citizens can trust.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose BlockVote?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800 border-0 shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:animate-pulse" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Experience the Future of Voting?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/voter">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold">
                Start Voting
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
