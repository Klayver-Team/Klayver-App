// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import { KlayverToken } from "./KlayverToken.sol";
import { IKIP7 } from '@klaytn/contracts/KIP/interfaces/IKIP7.sol';

contract Token {
    function createToken(
        string memory _tokenName,
        string memory _tokenSymbol
    ) external returns (address) {
        // Deploy token contract and mint some initial tokens
        KlayverToken newToken = new KlayverToken(_tokenName, _tokenSymbol);
        uint256 balance = newToken.retrieveTokenBalance(msg.sender);
        newToken.transferFrom(msg.sender, address(this), balance);

        return address(newToken);
    }

    function purchaseAToken(address _tokenAddress, address _profileAddress) payable public {
        IKIP7 token = IKIP7(_tokenAddress);
        token.approve(msg.sender, msg.value);
        token.transferFrom(msg.sender, _profileAddress, msg.value);
    }
}