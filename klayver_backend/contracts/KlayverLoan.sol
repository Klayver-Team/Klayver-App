// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@klaytn/contracts/KIP/token/KIP7/KIP7.sol";
import "./Klayver.sol";

contract KlayverLoan {
    Klayver public klayverToken;
    mapping(address => uint256) public loanBalance;
    mapping(address => uint256) public loanDueDate;

    constructor(address _klayverToken) {
        klayverToken = Klayver(_klayverToken);
    }

    function borrow(uint256 amount, uint256 durationDays) external {
        require(amount > 0, "Borrowing must be greater than zero");
        require(durationDays > 0, "Loan duration must be greater than zero");
        require(klayverToken.balanceOf(address(this)) >= amount, "Insufficient loan balance");

        // calculating the due date on the current block timestamp
        uint256 dueDate = block.timestamp + (durationDays * 1 days);

        // transfer the token to the borrower
        klayverToken.transfer(msg.sender, amount);
        // update the loan balance and due date
        loanBalance[msg.sender] += amount;
        loanDueDate[msg.sender] = dueDate;
    }

    function repayLoan(uint256 amount) external {
        require(amount > 0, "Repayment must be greater than zero");
        require(loanBalance[msg.sender] >= amount, "Not enough loan balance");
        // transfer paid token from the borrower
        klayverToken.transferFrom(msg.sender, address(this), amount);

        //update the borrower's loan balance and due date
        loanBalance[msg.sender] -= amount;
        // loanDueDate[msg.sender] = dueDate;
    }

    function getLoanDueDate(address borrower) external view returns (uint256) {
        return loanDueDate[borrower];
    }
}