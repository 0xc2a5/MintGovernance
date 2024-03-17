const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const [deployer] = await ethers.getSigners();
    const governor = await ethers.getContractAt("MyGovernor", process.env.TESTNET_GOVERNOR_CONTRACT);
    const token = await ethers.getContractAt("MyToken", process.env.TESTNET_TOKEN_CONTRACT);

    const amount = "12345";
    await governor.propose(
        [token.address],
        [0],
        [token.interface.encodeFunctionData("mint", [deployer.address, ethers.utils.parseEther(amount)])],
        "Give the deployer some more tokens!"
    );
    console.log(`Propose giving ${deployer.address} ${amount} more tokens`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// Propose giving 0x6f4678489cb47DC662d4259836e693A2ddD55BD2 12345 more tokens