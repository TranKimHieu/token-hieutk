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
const nft = await Nft.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3');

const Market = await ethers.getContractFactory('GameMarketplace');
const market = await Market.attach('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512');
*/