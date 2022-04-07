

const { ethers, upgrades } = require('hardhat');

async function main() {
    const Token = await ethers.getContractFactory('Mam');
    const token = await upgrades.deployProxy(Token);
    console.log('Deploy mam  ', await token.resolvedAddress);
}

main().then(() => {
    console.log('Deploy successful');
    process.exit(0)
}).catch(err => {
    console.log(err)
    process.exit(1)
})