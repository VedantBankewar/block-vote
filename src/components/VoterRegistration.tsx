
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface VoterRegistrationProps {
  onRegistrationComplete: () => void;
}

const VoterRegistration: React.FC<VoterRegistrationProps> = ({ onRegistrationComplete }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    idNumber: '',
    walletAddress: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.idNumber) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('voters')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          id_number: formData.idNumber,
          wallet_address: formData.walletAddress || null
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Registration Failed",
            description: "A voter with this email or ID number already exists",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      setIsRegistered(true);
      toast({
        title: "Registration Successful",
        description: "Your registration has been submitted. Please wait for admin verification.",
      });
    } catch (error) {
      console.error('Error registering voter:', error);
      toast({
        title: "Registration Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isRegistered) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-600 mb-2">Registration Submitted</h3>
          <p className="text-gray-600 mb-4">
            Your voter registration has been submitted successfully. Please wait for admin verification before you can participate in elections.
          </p>
          <Button onClick={onRegistrationComplete} className="w-full">
            Continue
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <UserPlus className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <CardTitle>Voter Registration</CardTitle>
        <CardDescription>
          Register to participate in elections. Admin verification required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="idNumber">ID Number *</Label>
            <Input
              id="idNumber"
              type="text"
              value={formData.idNumber}
              onChange={(e) => handleInputChange('idNumber', e.target.value)}
              placeholder="Enter your ID number"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="walletAddress">Wallet Address (Optional)</Label>
            <Input
              id="walletAddress"
              type="text"
              value={formData.walletAddress}
              onChange={(e) => handleInputChange('walletAddress', e.target.value)}
              placeholder="Enter your wallet address"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register as Voter'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VoterRegistration;
