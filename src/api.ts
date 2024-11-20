import axios from 'axios';
import { signMessage } from './signer';
import { VERTEX_BASE_URL, ALCHEMY_API_KEY } from './config';
import { createPublicClient, http } from 'viem';
import { arbitrumSepolia } from 'viem/chains';

export const placeOrder = async (
    walletClient: any, // Viem wallet client
    productId: number,
    priceX18: string,
    amount: string,
    id: number
) => {
    try {
        const publicClient = createPublicClient({
            chain: arbitrumSepolia,
            transport: http('https://arb-sepolia.g.alchemy.com/v2/' + ALCHEMY_API_KEY),
        });

        // Step 2: Fetch sender address and nonce
        const sender = await walletClient.getAddress();
        const nonce = await publicClient.getTransactionCount({ address: sender });

        const expiration = Math.floor(Date.now() / 1000) + 300; // 5 minutes from now

        const order = {
            sender,
            priceX18,
            amount,
            expiration,
            nonce,
        };

        const orderMessage = JSON.stringify(order);
        const signature = await signMessage(orderMessage);

        const payload = {
            place_order: {
                product_id: productId,
                order,
                signature,
                id,
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
