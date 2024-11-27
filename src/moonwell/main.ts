// Tasks:
//     Monitor liquidations on Moonwell app.
//     https://github.com/moonwell-fi/contracts-open-source/blob/c7da88a3fe3f0062d8a83ba808b648f1da369fec/contracts/core/MTokenInterfaces.sol#L163
//
// Context:
//     LTV 0.5 to 0.9
// total collateral value * LTV < total debt value


import { ethers } from 'ethers';
const ALCHEMY_API_URL = "example"

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_API_URL);

const COMPTROLLER_ADDRESS = '0xfBb21d0380beE3312B33c4353c8936a0F13EF26C'

const COMPTROLLER_ABI = [
    "event LiquidateBorrow(address liquidator, address borrower, uint repayAmount, address mTokenCollateral, uint seizeTokens);"
];

async function main() {
    console.log("Listening for LiquidateBorrow events...");

    const filter = contract.filters.LiquidateBorrow(null, null);

    // USDC token with precision 6. 1 dollar of liquidated amount is 1e6
    // ETH with precision of 18. 0.1 eth will be 1e17


    contract.on(filter, (liquidator, borrower, repayAmount, mTokenCollateral, seizeTokens, event) => {
        if (mTokenCollateral == USDC_Contract && repayAmount >= 100e6){
            console.log()
        }
        else (mTokenCollateral == ETH_CONTRACT && repayAmount >= 33e16){ 	0.033 eth => 100$ if 1ETH is 3000
            console.log()
        }
    });


    // contract.on(filter, (liquidator, borrower, repayAmount, mTokenCollateral, seizeTokens, event) => {
    //     console.log("\n--- Liquidation Detected ---");
    //     console.log(`Liquidator: ${liquidator}`);
    //     console.log(`Borrower: ${borrower}`);
    //     console.log(`Repay Amount: ${ethers.utils.formatEther(repayAmount)} ETH`);
    //     console.log(`Collateral Token Address: ${mTokenCollateral}`);
    //     console.log(`Seized Tokens: ${ethers.utils.formatEther(seizeTokens)} tokens`);
    //     console.log(`Block Number: ${event.blockNumber}`);
    //     console.log(`Transaction Hash: ${event.transactionHash}`);
    //     console.log("-----------------------------------");
    // });



}

main().catch((error) => {
    console.error("Error:", error);
});
