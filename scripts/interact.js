const { ethers } = require("ethers");
const ETHWrapper = require("../artifacts/contracts/ETHWrapper.sol/ETHWrapper.json");
const WETH = require("../artifacts/contracts/WETH.sol/WETH.json");

const run = async function() {

	const providerURL = "http://127.0.0.1:8545";
	const walletPrivateKey = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
	const wrapperContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

	const provider = new ethers.providers.JsonRpcProvider(providerURL)
	
	const wallet = new ethers.Wallet(walletPrivateKey, provider)

	const wrapperContract = new ethers.Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', ETHWrapper.abi, wallet)
	const wethAddress = await wrapperContract.WETHToken();

	console.log(wethAddress);
	
	const tokenContract = new ethers.Contract(wethAddress, WETH.abi, wallet)
	
	const wrapValue = ethers.utils.parseEther("1")

	const wrapTx = await wrapperContract.wrap({value: wrapValue})
	await wrapTx.wait();

	let balance = await tokenContract.balanceOf(wallet.address)
	console.log("Balance after wrapping:", balance.toString())

	let contractETHBalance = await provider.getBalance(wrapperContractAddress);
	console.log("Contract ETH balance after wrapping:", contractETHBalance.toString())

	const approveTx = await tokenContract.approve(wrapperContractAddress, wrapValue)
	await approveTx.wait()

	const unwrapTx = await wrapperContract.unwrap(wrapValue)
	await unwrapTx.wait()

	balance = await tokenContract.balanceOf(wallet.address)
	console.log("Balance after unwrapping:", balance.toString())

	contractETHBalance = await provider.getBalance(wrapperContractAddress);
	console.log("Contract ETH balance after unwrapping:", contractETHBalance.toString())
}

run()