// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@klaytn/contracts/KIP/token/KIP7/KIP7.sol";
import "@klaytn/contracts/access/Ownable.sol";

contract Klayver is KIP7, Ownable {
    mapping(address => uint256) public disputedFunds;
    address public admin;
    address public platformTreasury;
    uint256 public platformFeePercentage;

    event FundsWithheld(address account, uint256 amount);
    event FundsReleased(address account, uint256 amount);

    constructor() KIP7("Klayver", "KLV") {
        _mint(msg.sender, 200_000_000 * 10 ** uint256(decimals()));
        admin = msg.sender;
        platformTreasury = msg.sender;
        platformFeePercentage = 5;
    }

    modifier onlyAdminOrOwner() {
        require(msg.sender == admin || msg.sender == owner(), "Not authorized");
        _;
    }

    function setAdmin(address newAdmin) public onlyOwner {
        require(newAdmin != address(0), "New admin address cannot be zero");
        admin = newAdmin;
    }

    function withholdFunds(address account, uint256 amount) public onlyAdminOrOwner {
        require(balanceOf(account) >= amount, "Insufficient balance to withhold");
        disputedFunds[account] += amount;
        emit FundsWithheld(account, amount);
    }

    function releaseFunds(address account, uint256 amount) public onlyAdminOrOwner {
        require(disputedFunds[account] >= amount, "Not enough disputed funds");
        disputedFunds[account] -= amount;
        _transfer(address(this), account, amount);
        emit FundsReleased(account, amount);
    }

    function setPlatformTreasury(address newTreasuryAddress) public onlyOwner {
        platformTreasury = newTreasuryAddress;
    }

    function setPlatformFeePercentage(uint256 newPlatformFeePercentage) public onlyOwner {
        require(newPlatformFeePercentage <= 100, "Platform fee percentage cannot exceed 100%");
        platformFeePercentage = newPlatformFeePercentage;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override returns (bool) {
        uint256 platformFee = (amount * platformFeePercentage) / 100;
        _transfer(from, platformTreasury, platformFee);
        _transfer(from, to, amount - platformFee);
        return true;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(amount > 0, "Amount to mint must be positive");
        _mint(to, amount);
    }

    function getUserBalance(address account) public view returns (uint256) {
        return balanceOf(account);
    }

    function getPlatformTreasuryBalance() public view returns (uint256) {
        return balanceOf(platformTreasury);
    }

    function getTotalTokenSupply() public view returns (uint256) {
        return totalSupply();
    }

    function burn(address from, uint256 amount) public onlyOwner {
        require(amount > 0, "Amount to burn must be positive");
        require(balanceOf(from) >= amount, "Insufficient balance to burn");
        _burn(from, amount);
    }
}
