import { placeOrder } from './api';
import { createWalletClient, http} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { arbitrumSepolia } from 'viem/chains';
import { VERTEX_BASE_URL, PRIVATE_KEY, ALCHEMY_API_KEY } from './config';

const padSenderAddress = (address: string): string => {
    const hexAddress = address.toLowerCase().replace('0x', '');
    const paddedAddress = hexAddress.padEnd(64, '0');
    return `0x${paddedAddress}`;
};


const main = async () => {
    const productId = 1;
    const priceX18 = '1000000000000000000';
    const amount = '1000000000000000000';
    const id = 1;

    try {
        console.log('Placing order...');
        console.log('This is the URL of the API:', VERTEX_BASE_URL);

        const walletClient = createWalletClient({
            chain: arbitrumSepolia,
            transport: http(`https://arb-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
            account: privateKeyToAccount(`0x${PRIVATE_KEY}`),
        });

        const response = await placeOrder(walletClient, productId, priceX18, amount, id);

        console.log('Order placed successfully:', response);
    } catch (error: any) {
        console.error('Failed to place order:', error.message);
    }
};

main();


