
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wallet, Shield, AlertCircle } from 'lucide-react';

interface ConnectionStatusProps {
  isWalletConnected: boolean;
  isLedgerConnected: boolean;
  isElectionActive: boolean;
  onConnectWallet: () => void;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  isWalletConnected,
  isLedgerConnected,
  isElectionActive,
  onConnectWallet,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Wallet className={`h-6 w-6 ${isWalletConnected ? 'text-green-600' : 'text-gray-400'}`} />
              <div>
                <p className="font-medium">Wallet Status</p>
                <p className="text-sm text-gray-600">
                  {isWalletConnected ? 'Connected' : 'Not Connected'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Shield className={`h-6 w-6 ${isLedgerConnected ? 'text-green-600' : 'text-yellow-600'}`} />
              <div>
                <p className="font-medium">Hardware Security</p>
                <p className="text-sm text-gray-600">
                  {isLedgerConnected ? 'Ledger Connected' : 'Connect for Enhanced Security'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {!isWalletConnected && (
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertDescription>
            You need to connect your wallet to participate in voting.
            <Button onClick={onConnectWallet} className="ml-4 bg-blue-600 hover:bg-blue-700">
              Connect Wallet
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {!isElectionActive && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This election is currently inactive. Voting is not available at this time.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default ConnectionStatus;
