// contracts/May.sol
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Storage {
    uint256 public val;

    constructor(uint256 v) {
        val = v;
    }

    function setValue(uint256 v) public {
        val = v;
    }
}
