import { ethers } from 'ethers';
import { PRIVATE_KEY } from './config';

const wallet = new ethers.Wallet(PRIVATE_KEY);

export const signMessage = async (message: string): Promise<string> => {
    const signature = await wallet.signMessage(message);
    return signature;
};