import { placeOrder } from './api';
import { VERTEX_BASE_URL } from './config';

const main = async () => {
    const productId = 1;
    const sender = '0x5ca64308e32CEFfbfFC6E80e33D3EEB7E819afAa';
    const priceX18 = '1000000000000000000';
    const amount = '1000000000000000000';
    const expiration = '4294967295';
    const nonce = `${Date.now()}`;
    const id = 1;

    try {
        console.log('Placing order...');
        console.log('This is the URL of the API:', VERTEX_BASE_URL);
        const response = await placeOrder(productId, sender, priceX18, amount, expiration, nonce, id);
        console.log('Order placed successfully:', response);
    } catch (error: any) {
        console.error('Failed to place order:', error.message);
    }
};

main();


