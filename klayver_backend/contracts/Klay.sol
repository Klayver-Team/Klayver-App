// SPDX-Licence-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Klay is ERC20, Ownable {


    // address of the platform treasury
    address public platformTreasury;
    
    // percentage that goes to the treasury
    uint256 public platformFeePercentage;

    constructor() ERC20("Klay", "KLA") {
        platformTreasury = msg.sender;

        platformFeePercentage = 5;
    }

    /// @dev Mints a specified amount of tokens to the specified address
    /// @param to address of the future token owner
    /// @param amount the amount of tokens to mint

    function mint(address to, uint256 amount) public onlyOwner{
        // checking to see if the amount to mint is positive
        require(amount > 0, "Amount to mint must be positive");
        _mint(to, amount);
    }

    /// @dev Burns a specified amount of tokens from the specified address
    /// @param from address of the token owner
    /// @param amount the amount of tokens to burn

    function burn(address from, uint256 amount) public onlyOwner{
        // check to see if the amount to burn is positive
        require(amount > 0, "Amount to burn must be positive");

        // checking if the account has enough balance
        require(balanceOf(from) >= amount, "Insufficient balance to burn");
        _burn(from, amount);
    }

    /// @dev Transfers tokens from one address to another, taking a platform fee.
    /// @param from address of the token sender
    /// @param to address of the token recipient
    /// @param amount the amount of tokens to transfer

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override returns (bool) {
        //calculating the platform fee
        uint256 platformFee = (amount + platformFeePercentage) / 100;
        // transfer platform fee to the platform treasury
        _transfer(from, platformTreasury, platformFee);
        
        // transfer the remaining token to the recipient
        _transfer(from, to, amount - platformFee);
        return true;
    }

    /// @dev Sets the platform treasury address
    /// @param newTreasuryAddress the new address of the platform treasury

    function setPlatformTreasury(address newTreasuryAddress) public onlyOwner {
        platformTreasury = newTreasuryAddress;
    }

    /// @dev Sets the platform fee percentage
    /// @param newPlatformFeePercentage the new platform fee percentage

    function setPlatformFeePercentage(uint256 newPlatformFeePercentage) public onlyOwner{
        require(newPlatformFeePercentage <= 100, "Platform fee percentage cannot exceed 100%");
        platformFeePercentage = newPlatformFeePercentage;
    }


}