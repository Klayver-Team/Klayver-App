// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

contract KlayverProfile{
    address tokeContractAddress;

     struct Profile {
        string name;
        uint256 monthlyCharge;
        string bio;
        string profession;
        string skills;
        string reviews;
        address owner;
    }

    Profile[] public profiles;

    mapping(address => Profile) public profileByAddress;
    mapping(address => bool) public profileExists;

    function createAProfile(
    string memory _name,
    uint256 _monthlyCharge,
    string memory _bio,
    string memory _profession,
    string memory _skills
) external {
    require(!profileExists[msg.sender], "Profile already exists");

    Profile storage newProfile = profileByAddress[msg.sender];
    newProfile.name = _name;
    newProfile.monthlyCharge = _monthlyCharge;
    newProfile.bio = _bio;
    newProfile.profession = _profession;
    newProfile.skills = _skills;
    newProfile.owner = msg.sender;

    profiles.push(newProfile);
    profileByAddress[msg.sender] = newProfile;
    profileExists[msg.sender] = true;
}

    function retrieveUserDetail(address _owner) external view returns(Profile memory) {
        return profileByAddress[_owner];
    }

    function retrieveAllProfile() external view returns(Profile[] memory){
        return profiles;
    }
}