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
  const klayvertoken = await ethers.deployContract("KlayverToken", ["KlayverToken", "KTN"]);
  const token = await ethers.deployContract("Token");
  const klayContent = await ethers.deployContract("KlayContent");
  // const klay
  const klayverLoan = await ethers.deployContract("KlayverLoan", [
    klayvertoken.target,
  ]);

  console.log("Deploying Klayver");
  await klayver.waitForDeployment();
  console.log("Deploying KlayProfile");
  await klayverProfile.waitForDeployment();
  console.log("Deploying Token");
  await token.waitForDeployment();
  console.log("Deplying KlayContent");
  await klayContent.waitForDeployment();
  console.log("Deplying KlayToken");
  await klayvertoken.waitForDeployment();

 
  console.log("Deploying KlayverLoan");
  await klayverLoan.waitForDeployment();

  console.log(`Klayver successfully deployed ${klayver.target}`);
  console.log(`KlayProfile successfully deployed ${klayverProfile.target}`);
  console.log(`KlayverLoan successfully deployed ${klayverLoan.address}`);
  console.log(`Token successfully deployed ${token.target}`);
  console.log(`klayContent sucessfull deployed to ${klayContent.target}`);
  console.log("Deployment completed!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
