
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Globe, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ElectionSelector from '@/components/ElectionSelector';
import ElectionVoting from '@/components/ElectionVoting';
import VoterRegistration from '@/components/VoterRegistration';
import WalletConnector from '@/components/WalletConnector';
import StatusIndicator from '@/components/StatusIndicator';
import { useElections, Election } from '@/hooks/useElections';
import { useWallet } from '@/hooks/useWallet';

const VoterPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [currentElection, setCurrentElection] = useState<Election | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '', email: '', password: '', idNumber: ''
  });

  const { toast } = useToast();
  const { fetchElectionByCode, loading } = useElections();
  const { isConnected: isWalletConnected, address: walletAddress, connectWallet } = useWallet();

  const translations = {
    en: {
      title: 'BlockVote - Voter Portal',
      login: 'Login',
      register: 'Register',
      vote: 'Vote',
      results: 'Results',
      connectWallet: 'Connect MetaMask',
      castVote: 'Cast Vote',
      confirmVote: 'Confirm Vote',
      walletConnected: 'Wallet Connected',
      voterVerified: 'Voter Verified',
      voteConfirmed: 'Vote Confirmed'
    },
    hi: {
      title: 'ब्लॉकवोट - मतदाता पोर्टल',
      login: 'लॉग इन',
      register: 'पंजीकरण',
      vote: 'मतदान',
      results: 'परिणाम',
      connectWallet: 'मेटामास्क कनेक्ट करें',
      castVote: 'मत डालें',
      confirmVote: 'मत की पुष्टि करें',
      walletConnected: 'वॉलेट कनेक्टेड',
      voterVerified: 'मतदाता सत्यापित',
      voteConfirmed: 'मत की पुष्टि'
    }
  };

  const t = translations[language];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome back! Please connect your MetaMask wallet to continue.",
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.name && registerForm.email && registerForm.password && registerForm.idNumber) {
      setShowRegistration(true);
    }
  };

  const handleRegistrationComplete = () => {
    setShowRegistration(false);
    setIsLoggedIn(true);
    toast({
      title: "Account Created",
      description: "Your account has been created. Please wait for admin verification to vote.",
    });
  };

  const handleElectionSelect = async (electionCode: string) => {
    const election = await fetchElectionByCode(electionCode);
    if (election) {
      setCurrentElection(election);
      toast({
        title: "Election Found",
        description: `Access granted to ${election.title}`,
      });
    } else {
      toast({
        title: "Election Not Found",
        description: "Please check the election ID and try again.",
        variant: "destructive",
      });
    }
  };

  const handleBackToSelector = () => {
    setCurrentElection(null);
  };

  if (showRegistration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <VoterRegistration onRegistrationComplete={handleRegistrationComplete} />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              >
                <Globe className="h-4 w-4 mr-1" />
                {language === 'en' ? 'हिंदी' : 'English'}
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">Voter Access</CardTitle>
              <CardDescription>
                Login or register to participate in elections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">{t.login}</TabsTrigger>
                  <TabsTrigger value="register">{t.register}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      {t.login}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reg-email">Email</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="id-number">ID Number</Label>
                      <Input
                        id="id-number"
                        type="text"
                        value={registerForm.idNumber}
                        onChange={(e) => setRegisterForm({ ...registerForm, idNumber: e.target.value })}
                        placeholder="Enter your ID number"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reg-password">Password</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        placeholder="Create a password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      <UserPlus className="h-4 w-4 mr-2" />
                      {t.register}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatusIndicator
            status={isWalletConnected ? "success" : "pending"}
            title={isWalletConnected ? t.walletConnected : 'Wallet Not Connected'}
            description={isWalletConnected && walletAddress ? 
              `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 
              'Connect your wallet to vote'
            }
          />
          
          <StatusIndicator
            status="warning"
            title="Pending Verification"
            description="Wait for admin approval to vote"
          />
        </div>

        {!currentElection ? (
          <div className="flex justify-center">
            <ElectionSelector 
              onElectionSelect={handleElectionSelect} 
              loading={loading}
            />
          </div>
        ) : (
          <ElectionVoting
            election={currentElection}
            onBack={handleBackToSelector}
            walletAddress={walletAddress}
            isWalletConnected={isWalletConnected}
            onConnectWallet={connectWallet}
          />
        )}
      </div>
    </div>
  );
};

export default VoterPanel;
