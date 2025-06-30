
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Wallet, Loader, AlertCircle } from 'lucide-react';

interface LedgerConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isConnecting: boolean;
  onConnect: () => void;
  error: string | null;
}

const LedgerConnectionModal: React.FC<LedgerConnectionModalProps> = ({
  isOpen,
  onClose,
  isConnecting,
  onConnect,
  error,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            {isConnecting ? (
              <Loader className="h-16 w-16 text-blue-600 animate-spin" />
            ) : error ? (
              <AlertCircle className="h-16 w-16 text-red-600" />
            ) : (
              <Wallet className="h-16 w-16 text-blue-600" />
            )}
          </div>
          <DialogTitle className="text-center text-2xl">
            {isConnecting ? 'Connecting...' : 'Connect Hardware Wallet'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isConnecting ? (
              'Please approve the connection on your device'
            ) : error ? (
              error
            ) : (
              'Connect your Ledger or MetaMask wallet to participate in voting'
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {!isConnecting && !error && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Before connecting:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Connect your Ledger device</li>
                <li>• Open the Ethereum app</li>
                <li>• Ensure your device is unlocked</li>
              </ul>
            </div>
          )}
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isConnecting}>
              Cancel
            </Button>
            <Button 
              onClick={onConnect} 
              className="flex-1" 
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : error ? 'Retry' : 'Connect'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LedgerConnectionModal;
