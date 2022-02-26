require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: {
    version: "0.7.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    ropsten: {
      url: "https://ropsten.infura.io/v3/84e1b68f8f584bd6b90659abc701a79e",
      accounts: ['1cac585f49d7a0f7b33da29e656c4764b20a4aea099c4614326d2d856f0e3a6b']
    }
  },
    etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "CHIRAADNUI814XIT9ST36R63UFNBNDKBDY"
  }
};

// deployment task
task("deploy", "Deploys the contract", async (taskArgs, hre) => {
  const LimeToken = await hre.ethers.getContractFactory("LimeToken");
  const lime = await LimeToken.deploy();

  await lime.deployed();

  console.log("LimeCoin deployed to:", lime.address);
});

task("deploy-weth", "Deploys the contract", async (taskArgs, hre) => {
 
  const ETHWrapper = await hre.ethers.getContractFactory("ETHWrapper"); 
  const ethWrapperContract = await ETHWrapper.deploy();
  console.log('Waiting for ETHWrapper deployment...');
  await ethWrapperContract.deployed();

  console.log("WETHWrapper deployed to:", ethWrapperContract.address);
});