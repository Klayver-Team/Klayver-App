// SPX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Klayton is ERC20, Ownable {
    mapping(address => uint256) public disputedFunds;
    address public admin;

    event FundsWithheld(address account, uint256 amount);
    event FundsReleased(address account, uint256 amount);

    constructor() ERC20("Klayton", "KLY") {
        _mint(msg.sender, 200_000_000 * 10 ** uint256(decimals()));
        admin = msg.sender;      
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this operation");
        _;
    }
    
    // function to withhold any disputed funds
    function withHoldFunds(address account, uint256 amount)  public onlyAdmin {
        require (balanceOf(account) >= amount, "Insufficient balance to withhold");
        disputedFunds[account] += amount;
        emit FundsWithheld(account, amount);
    }

    function releaseFunds(address account, uint256 amount) public onlyAdmin{
        require(disputedFunds[account] >= amount, "Not enough disputed funds");
        disputedFunds[account] -= amount;
        _transfer(address(this), account, amount);
        emit FundsReleased(account, amount);
    }

    // function to change admin's address
    function changeAdmin(address newAdmin) public onlyOwner {
        require(newAdmin != address(0), "The new admin address cannot be zero");
        admin = newAdmin;
    }

    function approve(address spender, uint256 value) public override returns (bool success) {
       _approve(msg.sender, spender, value);
       return true;
    }
    
}
