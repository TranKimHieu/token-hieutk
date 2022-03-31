

const { ethers, upgrades } = require('hardhat');

async function main() {
    const Token = await ethers.getContractFactory('May');
    const token = await upgrades.deployProxy(Token);
    console.log('Deploy may  ', await token.resolvedAddress);
}

main().then(() => {
    console.log('Deploy successful');
    process.exit(0)
}).catch(err => {
    console.log(err)
    process.exit(1)
})