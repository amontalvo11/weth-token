const hre = require('hardhat');
const ethers = hre.ethers;

async function deployWETHWrapper() {
   
    const ETHWrapper = await ethers.getContractFactory("ETHWrapper"); // 
    const ethWrapperContract = await ETHWrapper.deploy();
    console.log('Waiting for ETHWrapper deployment...');
    await ethWrapperContract.deployed();

}
  
module.exports = ethWrapperContract;