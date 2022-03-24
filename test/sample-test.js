const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("hieutk token",  () => {
  let Token, token, owner, addr1, addr2;

  beforeEach(async () => {
    Token = await ethers.getContractFactory("Hieutk");
    token = await Token.deploy();
    await token.deployed();

    [owner, addr1, addr2, _] = await ethers.getSigners();
  })

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      expect(await token.owner()).to.equal(owner.address);
    });

    it('Should assign the total supply to owner', async () => {
      const ownerBalances = await token.balanceOf(owner.address)
      expect(await token.totalSupply()).to.equal(ownerBalances);
    })
  })

  describe('Transaction', () => {
    it('Should transfer successful', async () => {
      await token.transfer(addr1.address, 50);
      const addr1Balances = await token.balanceOf(addr1.address)

      expect(addr1Balances).to.equal(50)
    })
  })
});
