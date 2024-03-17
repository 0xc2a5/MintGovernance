const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const [deployer] = await ethers.getSigners();
    const governor = await ethers.getContractAt("MyGovernor", process.env.TESTNET_GOVERNOR_CONTRACT, deployer.target);
    const token = await ethers.getContractAt("MyToken", process.env.TESTNET_TOKEN_CONTRACT);

    const amount = "12345";
    await governor.execute(
        [token.address],
        [0],
        [token.interface.encodeFunctionData("mint", [deployer.address, ethers.utils.parseEther(amount)])],
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Give the deployer some more tokens!"))
    );
    console.log(`Execute proposal giving ${deployer.address} ${amount} more tokens`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// Transaction hash 0xc388b555929ddcc9c14da5b93d83b276ea7a762f59a2139e257e265ec147233e