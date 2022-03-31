// contracts/May.sol
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract Mayv2 is ERC20Upgradeable   {

    function initialize() public initializer {
       __ERC20_init_unchained('My May', 'MAY');
       _mint(msg.sender, 1000000000000000);
    }
    
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

}
