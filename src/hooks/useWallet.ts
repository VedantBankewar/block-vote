
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  isConnecting: boolean;
  chainId: string | null;
  error: string | null;
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    isConnecting: false,
    chainId: null,
    error: null,
  });
  const { toast } = useToast();

  const checkWalletConnection = useCallback(async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ 
          method: 'eth_accounts' 
        });
        
        if (accounts.length > 0) {
          const chainId = await (window as any).ethereum.request({ 
            method: 'eth_chainId' 
          });
          
          setWalletState({
            isConnected: true,
            address: accounts[0],
            isConnecting: false,
            chainId,
            error: null,
          });
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      const errorMessage = "MetaMask not found. Please install MetaMask to continue.";
      setWalletState(prev => ({ ...prev, error: errorMessage }));
      toast({
        title: "Wallet Not Found",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }

    setWalletState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      const accounts = await (window as any).ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      const chainId = await (window as any).ethereum.request({ 
        method: 'eth_chainId' 
      });

      setWalletState({
        isConnected: true,
        address: accounts[0],
        isConnecting: false,
        chainId,
        error: null,
      });

      toast({
        title: "Wallet Connected",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });

      return true;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to connect wallet";
      setWalletState({
        isConnected: false,
        address: null,
        isConnecting: false,
        chainId: null,
        error: errorMessage,
      });

      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive",
      });

      return false;
    }
  }, [toast]);

  const disconnectWallet = useCallback(() => {
    setWalletState({
      isConnected: false,
      address: null,
      isConnecting: false,
      chainId: null,
      error: null,
    });

    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  }, [toast]);

  const switchNetwork = useCallback(async (targetChainId: string) => {
    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetChainId }],
      });
      
      setWalletState(prev => ({ ...prev, chainId: targetChainId }));
      return true;
    } catch (error: any) {
      console.error('Error switching network:', error);
      toast({
        title: "Network Switch Failed",
        description: error.message || "Failed to switch network",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  useEffect(() => {
    checkWalletConnection();

    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setWalletState(prev => ({ 
            ...prev, 
            address: accounts[0],
            isConnected: true 
          }));
        }
      };

      const handleChainChanged = (chainId: string) => {
        setWalletState(prev => ({ ...prev, chainId }));
      };

      (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
      (window as any).ethereum.on('chainChanged', handleChainChanged);

      return () => {
        (window as any).ethereum.removeListener('accountsChanged', handleAccountsChanged);
        (window as any).ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [checkWalletConnection, disconnectWallet]);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    checkWalletConnection,
  };
};
