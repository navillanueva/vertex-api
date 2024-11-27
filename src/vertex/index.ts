import { placeOrder } from './api';
import { VERTEX_BASE_URL } from './config';


const main = async () => {
    const productId = 1;
    const priceX18 = '1000000000000000000';
    const amount = '1000000000000000000';

    try {
        console.log('Placing order...');
        console.log('This is the URL of the API:', VERTEX_BASE_URL);
        const response = await placeOrder(productId, priceX18, amount);
        console.log('Order placed successfully:', response);
    } catch (error: any) {
        console.error('Failed to place order:', error.message);
    }
};

main();


