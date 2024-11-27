import {createWalletClient, http} from 'viem';
import {arbitrumSepolia} from 'viem/chains';
import {ALCHEMY_API_KEY, PRIVATE_KEY} from './config';
import {privateKeyToAccount} from 'viem/accounts';

const walletClient = createWalletClient({
    chain: arbitrumSepolia,
    transport: http('https://arb-sepolia.g.alchemy.com/v2/' + ALCHEMY_API_KEY),
    account: privateKeyToAccount(`0x${PRIVATE_KEY}`),
});

export const signMessage = async (message: string): Promise<string> => {
    return await walletClient.signMessage({message});
};
