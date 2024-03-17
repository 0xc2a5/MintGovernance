const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  const transactionCount = await deployer.getTransactionCount();

  // gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: deployer.address,
    nonce: transactionCount + 1
  });

  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = await MyGovernor.deploy(futureAddress);

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(governor.address);

  console.log(
    `Governor deployed to ${governor.address}`,
    `Token deployed to ${token.address}`
  );

  await token.delegate(deployer.address);
  console.log("Delegate to ", deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Governor deployed to 0xd925eAA651d57989a3eA179258bCD2Ef9AB91b15 
// Token deployed to 0xfF66f22648d95e865b459041c9f4beF1fd6c0E6F
// Delegate to  0x6f4678489cb47DC662d4259836e693A2ddD55BD2
