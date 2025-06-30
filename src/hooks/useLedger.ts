
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface LedgerState {
  isConnected: boolean;
  isConnecting: boolean;
  device: any | null;
  error: string | null;
}

export const useLedger = () => {
  const [ledgerState, setLedgerState] = useState<LedgerState>({
    isConnected: false,
    isConnecting: false,
    device: null,
    error: null,
  });
  const { toast } = useToast();

  const connectLedger = useCallback(async () => {
    setLedgerState(prev => ({ ...prev, isConnecting: true, error: null }));
    
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        if (accounts.length > 0) {
          setLedgerState({
            isConnected: true,
            isConnecting: false,
            device: accounts[0],
            error: null,
          });
          
          toast({
            title: "Ledger Connected",
            description: "Hardware wallet connected successfully",
          });
          
          return accounts[0];
        }
      } else {
        throw new Error("Please install MetaMask or connect your Ledger device");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Failed to connect to Ledger device";
      setLedgerState({
        isConnected: false,
        isConnecting: false,
        device: null,
        error: errorMessage,
      });
      
      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return null;
    }
  }, [toast]);

  const disconnectLedger = useCallback(() => {
    setLedgerState({
      isConnected: false,
      isConnecting: false,
      device: null,
      error: null,
    });
    
    toast({
      title: "Ledger Disconnected",
      description: "Hardware wallet disconnected",
    });
  }, [toast]);

  const signVote = useCallback(async (voteData: any) => {
    if (!ledgerState.isConnected || !ledgerState.device) {
      throw new Error("Ledger device not connected");
    }

    try {
      // Simulate signing process
      const signature = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) { // 90% success rate for demo
            resolve(`0x${Math.random().toString(16).substr(2, 64)}`);
          } else {
            reject(new Error("User rejected transaction"));
          }
        }, 2000);
      });

      return signature;
    } catch (error: any) {
      toast({
        title: "Signing Failed",
        description: error.message || "Failed to sign vote",
        variant: "destructive",
      });
      throw error;
    }
  }, [ledgerState, toast]);

  return {
    ...ledgerState,
    connectLedger,
    disconnectLedger,
    signVote,
  };
};
