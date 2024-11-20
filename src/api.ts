import axios from 'axios';
import { signMessage } from './signer';
import { VERTEX_BASE_URL } from './config';

export const placeOrder = async (
    productId: number,
    sender: string,
    priceX18: string,
    amount: string,
    expiration: string,
    nonce: string,
    id: number
) => {
    try {
        // Construct the order object
        const order = {
            sender,
            priceX18,
            amount,
            expiration,
            nonce,
        };

        // Serialize the order object to a string for signing
        const orderMessage = JSON.stringify(order);

        // Sign the serialized order
        const signature = await signMessage(orderMessage);

        // Construct the full payload
        const payload = {
            place_order: {
                product_id: productId,
                order,
                signature,
                id,
            },
        };

        // Send the API request
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
