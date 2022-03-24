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

// const INFURA_URL = 'https://ropsten.infura.io/v3/ef5d358976f240488b839fa46b9f72eb';
// const secret_token = 'c4b883257e2e32864ec6bbd8368e26da03ed534b6b63b48cc5bf141795bf9823'; // Ropsten ETH
const ALCHEMY_URL = 'https://eth-rinkeby.alchemyapi.io/v2/0tCm7HqBa08xG6CHyPOFpPVC--2O_2Pb';

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      forking: {
        url: ALCHEMY_URL,
        blockNumber: 10381320
      }
    }
  }
};
