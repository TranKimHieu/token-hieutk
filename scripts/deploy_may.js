
const hre = require("hardhat");

async function main() {
    const Token = await hre.ethers.getContractFactory('May');
    const token = await Token.deploy();
    const [owner] = await hre.ethers.getSigners();
    console.log('Deploy may', await token.resolvedAddress);
}

main().then(() => {
    console.log('Deploy successful');
    process.exit(0)
}).catch(err => {
    console.log(err)
    process.exit(1)
})