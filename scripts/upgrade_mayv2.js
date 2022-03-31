
// scripts/deploy_upgradeable_box.js
const { ethers, upgrades } = require('hardhat');

async function main() {
    const Tokenv2 = await ethers.getContractFactory('Mayv2');
    const token = await upgrades.upgradeProxy('0xb25cafd4b5FCBAE13Cb6d761dA4fdED3bA07008C', Tokenv2);
    console.log('Deploy may', await token.resolvedAddress);

    console.log('Upgraded');
}

main().then(() => {
    console.log('Done');
    process.exit(0)
}).catch(err => {
    console.log(err)
    process.exit(1)
})