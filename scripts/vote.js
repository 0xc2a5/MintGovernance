const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const proposalId = ethers.BigNumber.from(process.env.TESTNET_PROPOSAL_ID);
    const governor = await ethers.getContractAt("MyGovernor", process.env.TESTNET_GOVERNOR_CONTRACT);
    await governor.castVote(proposalId.toString(), 1);
    console.log("cast vote");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// Transaction hash 0xfb308453f3db857fa3259bd5fa1b57bac0ecab6ff8ed95c94541a04416ae556a