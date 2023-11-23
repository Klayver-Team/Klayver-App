
const { ethers } = require("hardhat");

async function main() {

  const deployerAddr = "0xa44C7014aE6A4f065086dbD5417272DBA1f489f0";
  const deployer = await ethers.getSigner(deployerAddr);

  console.log(`Deploying Klayver contract with the account ${deployer.address}`);
  console.log(`Account balance: ${(await deployer.provider.getBalance(deployerAddr)).toString()}`)

  const klayver = await ethers.deployContract("Klayver");
  const klayProfile = await ethers.deployContract("KlayverProfile");
  const klayverToken = await ethers.deployContract("KlayverToken");

  console.log("Deploying Klayver");
  await klayver.waitForDeployment();
  console.log("Deploying KlayProfile");
  await klayProfile.waitForDeployment()
  console.log("Deploying KlayverToken");
  await klayverToken.waitForDeployment();

  console.log(`Klayver successfully deployed ${klayver.address}`);
  console.log(`KlayProfile successfully deployed ${klayProfile.address}`);
  console.log(`KlayverToken successfully deployed ${klayverToken.address}`);
  console.log("Deployment completed!")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
