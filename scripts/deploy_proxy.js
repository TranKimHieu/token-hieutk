
const hre = require("hardhat");
const BN = require('bn.js');

async function main() {

    const Calculator = await hre.ethers.getContractFactory('Calculator');
    const calculator = await Calculator.deploy();

    const Machine = await hre.ethers.getContractFactory('Machine');
    const machine = await Machine.deploy();

    const [owner] = await hre.ethers.getSigners();
    console.log('Deploy Calculator', await calculator.resolvedAddress);
    console.log('Deploy Machine', await machine.resolvedAddress);
}

main().then(() => {
    console.log('Deploy successful');
    process.exit(0)
}).catch(err => {
    console.log(err)
    process.exit(1)
})