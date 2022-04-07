// contracts/May.sol
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./storage.sol";


contract Machine {
    uint256 public calculateResult;

    address public user;

    event AddedValuesByDelegateCall(uint256 a, uint256 b, bool success);
    event AddedValuesByCall(uint256 a, uint256 b, bool success);

    constructor() {
        calculateResult = 0;
    }

    function addValuesWithDelegateCall(
        address calculator,
        uint256 a,
        uint256 b
    ) public returns (uint256) {
        (bool success, bytes memory result) = calculator.delegatecall(
            abi.encodeWithSignature("add(uint256,uint256)", a, b)
        );
        emit AddedValuesByDelegateCall(a, b, success);

        return abi.decode(result, (uint256));
    }

    function addValuesWithCall(
        address calculator,
        uint256 a,
        uint256 b
    ) public returns (uint256) {
        (bool success, bytes memory result) = calculator.call(
            abi.encodeWithSignature("add(uint256,uint256)", a, b)
        );
        emit AddedValuesByCall(a, b, success);
      
        return abi.decode(result, (uint256));
    }
}

/*
const Machine = await ethers.getContractFactory('Machine');
const machine = await Machine.attach('0xeeB87AcfaA0F42C3C899C761c3e2d1de23d54C0A');

const Cal = await ethers.getContractFactory('GameNFT');
const game = await Cal.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3');

*/