
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import StatusIndicator from './StatusIndicator';

interface WalletConnectorProps {
  onConnected?: (address: string) => void;
  showStatus?: boolean;
  compact?: boolean;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ 
  onConnected, 
  showStatus = true, 
  compact = false 
}) => {
  const { 
    isConnected, 
    address, 
    isConnecting, 
    chainId, 
    error, 
    connectWallet, 
    disconnectWallet 
  } = useWallet();

  React.useEffect(() => {
    if (isConnected && address && onConnected) {
      onConnected(address);
    }
  }, [isConnected, address, onConnected]);

  const handleConnect = async () => {
    await connectWallet();
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {isConnected ? (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <Button size="sm" variant="outline" onClick={disconnectWallet}>
              Disconnect
            </Button>
          </div>
        ) : (
          <Button 
            size="sm" 
            onClick={handleConnect} 
            disabled={isConnecting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isConnecting ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </>
            )}
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Wallet Connection
        </CardTitle>
        <CardDescription>
          Connect your MetaMask wallet to participate in voting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showStatus && (
          <>
            {isConnected ? (
              <StatusIndicator
                status="success"
                title="Wallet Connected"
                description={`${address?.slice(0, 10)}...${address?.slice(-8)}`}
              />
            ) : error ? (
              <StatusIndicator
                status="error"
                title="Connection Failed"
                description={error}
              />
            ) : (
              <StatusIndicator
                status="pending"
                title="Wallet Not Connected"
                description="Connect your wallet to continue"
              />
            )}
            
            {chainId && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Network:</span> {chainId}
              </div>
            )}
          </>
        )}

        <div className="flex gap-2">
          {isConnected ? (
            <Button 
              variant="outline" 
              onClick={disconnectWallet}
              className="flex-1"
            >
              Disconnect Wallet
            </Button>
          ) : (
            <Button 
              onClick={handleConnect} 
              disabled={isConnecting}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isConnecting ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect MetaMask
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletConnector;
