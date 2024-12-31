// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("LeoDox", "LEO"){
        _mint(msg.sender,100000000000000000000000); //1,00,000 tokens   //eg 66-> address
    }
}

//note 1 ERC20 token is == 1* 10^18
