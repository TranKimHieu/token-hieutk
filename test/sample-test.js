const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("hieutk token", () => {
  let Marketplace, marketplace, Token, token, owner, addr1, addr2;

  beforeEach(async () => {
    Token = await hre.ethers.getContractFactory('GameNFT');
    token = await Token.deploy();

    Marketplace = await hre.ethers.getContractFactory('GameMarketplace');
    marketplace = await Marketplace.deploy(token.resolvedAddress);

    [owner, addr1, addr2, _] = await ethers.getSigners();
  })

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      expect(await token.symbol()).to.equal('GAM');
    });
  })

  describe('Transaction', () => {
    it('Mint NFT', async () => {
      await token.awardItem(addr1.address, 'http://www.ucan.vn/upload/userfiles/organizations/1/1/img/grammar%20A-Z/Beautiful-Wallpapers-14.jpg');
      const ownerNFTAddr = await token.ownerOf(1)

      expect(ownerNFTAddr).to.equal(addr1.address)
    })

    it('Approve adr1 to owner', async () => {
      const contractWithAddr1 = token.connect(addr1);

      await contractWithAddr1.awardItem(addr1.address, 'http://www.ucan.vn/upload/userfiles/organizations/1/1/img/grammar%20A-Z/Beautiful-Wallpapers-14.jpg');

      await contractWithAddr1.approve(owner.address, 1);

      const addresApproved = await token.getApproved(1);

      expect(addresApproved).to.equal(owner.address)
    })

    it('Put item to sale', async () => {
      const nftWithAddr1 = token.connect(addr1);
      const marketWithAddr1 = marketplace.connect(addr1);

      const nftWithAddr2 = token.connect(addr2);
      const marketWithAddr2 = marketplace.connect(addr2);

      await nftWithAddr1.awardItem(addr1.address, 'http://www.ucan.vn/upload/userfiles/organizations/1/1/img/grammar%20A-Z/Beautiful-Wallpapers-14.jpg');

      await nftWithAddr1.approve(marketplace.address, 1);

      await marketWithAddr1.putItemForSale(1, ethers.utils.parseEther("2.0"));
      const item = await marketWithAddr1.itemsForSale(0);

      // Test attribule
      expect(item.price).to.equal(ethers.utils.parseEther("2.0"));
      expect(item.id).to.equal(0);
      expect(item.seller).to.equal(addr1.address);

      await marketWithAddr2.buyItem(0, { value: ethers.utils.parseEther("3.0") });

      const balances1 = await nftWithAddr2.balanceOf(addr1.address);
      const balances2 = await nftWithAddr2.balanceOf(addr2.address);

      // Test Buy NFT
      expect(balances2).to.equal(1);
      expect(balances1).to.equal(0);

      const owner2 = await nftWithAddr2.ownerOf(1);
      expect(owner2).to.equal(addr2.address);

      const provider = waffle.provider;


      // Test balance ETH


      // const balanceOfAddr2 = await provider.getBalance(addr2.address);
      // expect(ethers.utils.formatEther('' + balanceOfAddr2)).to.equal(10000);

      // const balanceOfAddr1 = await provider.getBalance(addr1.address);
      // expect(ethers.utils.formatEther('' + balanceOfAddr1)).to.equal(10000);

      const balanceOfMarketplace = await provider.getBalance(marketplace.address);
      expect(ethers.utils.formatEther('' + balanceOfMarketplace)).to.equal(10000);
    })
  })
});
