
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionHash: string;
  candidateName: string;
}

const VoteConfirmationModal: React.FC<VoteConfirmationModalProps> = ({
  isOpen,
  onClose,
  transactionHash,
  candidateName,
}) => {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(transactionHash);
    toast({
      title: "Copied!",
      description: "Transaction hash copied to clipboard",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <DialogTitle className="text-center text-2xl">Vote Confirmed!</DialogTitle>
          <DialogDescription className="text-center">
            Your vote for <strong>{candidateName}</strong> has been successfully recorded on the blockchain.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Transaction Hash:</p>
            <div className="flex items-center space-x-2">
              <code className="flex-1 text-xs bg-white p-2 rounded border font-mono break-all">
                {transactionHash}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => window.open(`https://etherscan.io/tx/${transactionHash}`, '_blank')}
              className="flex-1"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Explorer
            </Button>
            <Button onClick={onClose} className="flex-1">
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoteConfirmationModal;
