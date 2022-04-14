// contracts/May.sol
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameNFT is ERC721("GameNFT", "GAM") {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mapping from token ID to URI
    mapping(uint256 => string) private _tokenURIs;

    function awardItem(address player, string memory tokenURINew)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURINew);
        _approve(player, newItemId);
        
        return newItemId;
    }

    function _setTokenURI(uint256 newItemId, string memory _tokenURI)
        internal
    {
        _tokenURIs[newItemId] = _tokenURI;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        // string memory baseURI = _baseURI();
        return  _tokenURIs[tokenId];
        // return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, _tokenURIs[tokenId])) : "";
    }
}

/*
const Nft = await ethers.getContractFactory('GameNFT');
const nft = await Nft.attach('0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1');

const Market = await ethers.getContractFactory('GameMarketplace');
const market = await Market.attach('0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE');

await nft.awardItem("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "http://www.ucan.vn/upload/userfiles/organizations/1/1/img/grammar%20A-Z/Beautiful-Wallpapers-14.jpg");
await nft.approve("0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE", 1);

await market.putItemForSale(1, 2);
*/