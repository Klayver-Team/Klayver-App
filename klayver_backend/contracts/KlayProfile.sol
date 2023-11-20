// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import { KlayverToken } from "./KlayverToken.sol";
import { IKIP7 } from '@klaytn/contracts/KIP/interfaces/IKIP7.sol';

/// @title Klayver Profile
/// @author Joseph
/// @notice This contract is for the Klayver Profile, for the users to create their own profile and deploy their profile token
/// @dev This contract is as follows: create a profile, edit a profile, delete a profile, deploy a profile token, edit a profile token, delete a profile token, and more

contract KlayverProfile {
    struct Profile {
        string name;
        string profilePic;
        address profileTokenAddress;
        uint256 monthlyCharge;
        uint256 tokenBalance;
        string bio;
        string profession;
        string[] skills;
        string[] reviews;
    }

    Profile[] public profiles;

    mapping(address => Profile) public profileByAddress;
    mapping(address => bool) public profileExists;

    function createAProfile(
        string memory _name,
        string memory _profilePic,
        uint256 _monthlyCharge,
        string memory _bio,
        string memory _profession,
        string[] memory _skills,
        string memory _tokenName,
        string memory _tokenSymbol
    ) external {
        require(!profileExists[msg.sender], "Profile already exists");

        // Deploy token contract and mint some initial tokens
        KlayverToken newToken = new KlayverToken(_tokenName, _tokenSymbol);
        uint256 balance = newToken.retrieveTokenBalance(msg.sender);
        //newToken.approve(address(this), balance);
        newToken.transferFrom(msg.sender, address(this), balance);

        Profile storage newProfile = profileByAddress[msg.sender];
        newProfile.name = _name;
        newProfile.profilePic = _profilePic;
        newProfile.profileTokenAddress = address(newToken);
        newProfile.monthlyCharge = _monthlyCharge;
        newProfile.bio = _bio;
        newProfile.profession = _profession;
        newProfile.skills = _skills;
        newProfile.tokenBalance = balance;

        profiles.push(newProfile);
        profileByAddress[msg.sender] = newProfile;
        profileExists[msg.sender] = true;
    }

    function retrieveUserDetail(address _owner) external view returns(Profile memory) {
        return profileByAddress[_owner];
    }

    function retrieveUserTokenAddress(address _owner) external view returns(address) {
        return profileByAddress[_owner].profileTokenAddress;
    }

    function retrieveAllProfile() external view returns(Profile[] memory){
        return profiles;
    }

    function purchaseAToken(address _tokenAddress, address _profileAddress /*uint256 _amountOfMonth*/) payable public {
        IKIP7 token = IKIP7(_tokenAddress);
        token.approve(msg.sender, msg.value);
        token.transferFrom(msg.sender, _profileAddress, msg.value);
    }
}
