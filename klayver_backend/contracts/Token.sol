// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import { KlayverToken } from "./KlayverToken.sol";
import { IKIP7 } from '@klaytn/contracts/KIP/interfaces/IKIP7.sol';

contract Token {
    
    struct UserToken {
        address tokenAddress;
        address owner;
        uint256 userBalance;
    }

    UserToken[] allTokens;

    mapping(address => UserToken) public addressToToken;

    function createToken(
    ) external returns (address) {
        // Deploy token contract and mint some initial tokens
        KlayverToken newToken = new KlayverToken("Talent Token", "TLT");
        uint256 balance = newToken.retrieveTokenBalance(msg.sender);
        newToken.transferFrom(msg.sender, address(this), balance);

        UserToken storage newUserToken = addressToToken[msg.sender];
        
        newUserToken.owner = msg.sender;
        newUserToken.tokenAddress = address(newToken);
        newUserToken.userBalance = balance;

        allTokens.push(newUserToken);

        return address(newToken);
    }

    function retrieveAllToken()external view returns(UserToken[]  memory) {
        return allTokens;
    }

    function purchaseAToken(address _tokenAddress, address _profileAddress) payable public {
        IKIP7 token = IKIP7(_tokenAddress);
        token.approve(msg.sender, msg.value);
        token.transferFrom(msg.sender, _profileAddress, msg.value);
    }
}