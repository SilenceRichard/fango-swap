"use client";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { WalletOptions } from './wallet-connect';
import { Account } from './account';

export default function ConnectWallet() {
    const { isConnected } = useAccount()
    if (isConnected) return <Account />
    return <WalletOptions />
}