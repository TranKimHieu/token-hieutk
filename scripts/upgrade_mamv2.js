
// scripts/deploy_upgradeable_box.js
const { ethers, upgrades } = require('hardhat');

async function main() {
    const Tokenv2 = await ethers.getContractFactory('Mamv2');
    const token = await upgrades.upgradeProxy('0x2Ef3bDE79496880d5D37772C0BD378387433B524', Tokenv2);
    console.log('Deploy mam', await token.resolvedAddress);

    console.log('Upgraded');
}

main().then(() => {
    console.log('Done');
    process.exit(0)
}).catch(err => {
    console.log(err)
    process.exit(1)
})