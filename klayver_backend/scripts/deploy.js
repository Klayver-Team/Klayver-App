const { ethers } = require("hardhat");

async function main() {
  const deployerAddr = "0xAAC1de3A83DdBE8b88B3837bC4C10F7c8Fd17790";
  const deployer = await ethers.getSigner(deployerAddr);

  console.log(
    `Deploying Klayver contract with the account ${deployer.address}`
  );
  console.log(
    `Account balance: ${(
      await deployer.provider.getBalance(deployerAddr)
    ).toString()}`
  );

  const klayver = await ethers.deployContract("Klayver");
  const klayverProfile = await ethers.deployContract("KlayverProfile");
  // const klayverToken = await ethers.deployContract("KlayverToken");
  const token = await ethers.deployContract("Token");

  console.log("Deploying Klayver");
  await klayver.waitForDeployment();
  console.log("Deploying KlayProfile");
  await klayverProfile.waitForDeployment();
  console.log("Deploying KlayverToken");
  // await klayverToken.waitForDeployment();
  console.log("Deploying Token");
  await token.waitForDeployment();

  console.log(`Klayver successfully deployed ${klayver.target}`);
  console.log(`KlayProfile successfully deployed ${klayverProfile.target}`);
  // console.log(`KlayverToken successfully deployed ${klayverToken.address}`);
  console.log(`Token successfully deployed ${token.target}`);
  console.log("Deployment completed!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
