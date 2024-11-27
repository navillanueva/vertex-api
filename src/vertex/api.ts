import axios from 'axios';
import { signMessage } from './signer';
import { VERTEX_BASE_URL, ALCHEMY_API_KEY, PRIVATE_KEY } from './config';
import { createWalletClient, createPublicClient, http } from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

let counter = 0;

const padSenderAddress = (address: string): string => {
    const hexAddress = address.toLowerCase().replace('0x', '');
    const paddedAddress = hexAddress.padEnd(64, '0');
    return `0x${paddedAddress}`;
};

const genOrderNonce = (counter: number): string => {
    const timestamp = Math.floor(Date.now() / 1000);
    counter += 1;
    const nonce = (BigInt(timestamp) << BigInt(32) + BigInt(counter));
    return nonce.toString();
};


export const placeOrder = async (
    productId: number,
    priceX18: string,
    amount: string
) => {
    try {
        const account = privateKeyToAccount(`0x${PRIVATE_KEY}`);

        const wallet = createWalletClient({
            chain: arbitrumSepolia,
            transport: http('https://arb-sepolia.g.alchemy.com/v2/' + ALCHEMY_API_KEY),
            account,
        });

        const publicClient = createPublicClient({
            chain: arbitrumSepolia,
            transport: http(`https://arb-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
        });

        const sender = padSenderAddress(wallet.account.address).toString();
        const nonce = genOrderNonce(counter);
        const expiration = (Math.floor(Date.now() / 1000) + 300).toString(); // 5 minutes from now

        console.log("This is the sender address:", sender);
        console.log("This is the nonce:", nonce);

        const order = {
            sender,
            priceX18,
            amount,
            expiration,
            nonce,
        };

        const orderMessage = JSON.stringify(order);
        const signature = await wallet.account.signMessage({ message: orderMessage });

        const payload = {
            place_order: {
                product_id: productId,
                order,
                signature,
            },
        };

        const response = await axios.post(`${VERTEX_BASE_URL}/execute`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error: any) {
        console.error('Error placing order:', error.response?.data || error.message);
        throw error;
    }
};
