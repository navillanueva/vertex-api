// Tasks:
//     Monitor liquidations on Moonwell app.
//     https://github.com/moonwell-fi/contracts-open-source/blob/c7da88a3fe3f0062d8a83ba808b648f1da369fec/contracts/core/MTokenInterfaces.sol#L163
//

import { createPublicClient, createEventFilter, parseAbiEvent, decodeEventLog, http } from 'viem';
import { mainnet } from 'viem/chains';

// Set up the Moonbeam network using viem
const ALCHEMY_API_URL = "example"; // Replace with your Alchemy API URL
const client = createPublicClient({
    chain: mainnet,
    transport: http(ALCHEMY_API_URL),
});

// Contract details
const COMPTROLLER_ADDRESS = '0xfBb21d0380beE3312B33c4353c8936a0F13EF26C'; // Moonwell Comptroller contract
const COMPTROLLER_ABI = [
    "event LiquidateBorrow(address liquidator, address borrower, uint256 repayAmount, address mTokenCollateral, uint256 seizeTokens)"
];

// Token contracts (replace with actual token addresses)
const USDC_CONTRACT = "0xUSDC_Contract_Address"; // Replace with actual USDC contract address
const ETH_CONTRACT = "0xETH_Contract_Address"; // Replace with actual ETH contract address

// Filtering thresholds
const USDC_THRESHOLD = 100e6; // $100 in USDC, considering 6 decimals
const ETH_THRESHOLD = 33e16; // $100 in ETH, considering 18 decimals

async function main() {
    console.log("Listening for LiquidateBorrow events...");

    // Create an event filter for LiquidateBorrow
    const filter = createEventFilter({
        address: COMPTROLLER_ADDRESS,
        abi: COMPTROLLER_ABI,
        eventName: 'LiquidateBorrow',
    });

    // Poll for events
    client.watchEvent({
        filter,
        onLogs: (logs) => {
            logs.forEach((log) => {
                try {
                    // Decode event log
                    const { args } = decodeEventLog({
                        abi: COMPTROLLER_ABI,
                        data: log.data,
                        topics: log.topics,
                    });

                    const {
                        liquidator,
                        borrower,
                        repayAmount,
                        mTokenCollateral,
                        seizeTokens,
                    } = args;

                    // Check for $100 threshold
                    if (
                        (mTokenCollateral === USDC_CONTRACT && repayAmount >= USDC_THRESHOLD) ||
                        (mTokenCollateral === ETH_CONTRACT && repayAmount >= ETH_THRESHOLD)
                    ) {
                        console.log("\n--- Liquidation Detected ---");
                        console.log(`Liquidator: ${liquidator}`);
                        console.log(`Borrower: ${borrower}`);
                        console.log(`Repay Amount: ${repayAmount}`);
                        console.log(`Collateral Token: ${mTokenCollateral}`);
                        console.log(`Seized Tokens: ${seizeTokens}`);
                        console.log(`Block Number: ${log.blockNumber}`);
                        console.log(`Transaction Hash: ${log.transactionHash}`);
                        console.log("-----------------------------------");
                    }
                } catch (err) {
                    console.error("Error decoding log:", err);
                }
            });
        },
        onError: (error) => {
            console.error("Error watching event:", error);
        },
    });
}

// Run the script
main().catch((error) => {
    console.error("Error:", error);
});

