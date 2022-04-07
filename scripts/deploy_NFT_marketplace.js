
const hre = require("hardhat");

async function main() {
    const Token = await hre.ethers.getContractFactory('GameNFT');
    const token = await Token.deploy();
   
    const Marketplace = await hre.ethers.getContractFactory('GameMarketplace');
    const marketplace = await Marketplace.deploy(token.resolvedAddress);

    console.log('Deploy NFT', await token.resolvedAddress);

    console.log('Deploy Marketplace', await marketplace.resolvedAddress);
}

main().then(() => {
    console.log('Deploy successful');
    process.exit(0)
}).catch(err => {
    console.log(err)
    process.exit(1)
})