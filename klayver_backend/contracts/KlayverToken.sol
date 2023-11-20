// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@klaytn/contracts/KIP/token/KIP7/KIP7.sol";
import "@klaytn/contracts/KIP/token/KIP7/extensions/KIP7Burnable.sol";
import "@klaytn/contracts/security/Pausable.sol";
import "@klaytn/contracts/access/Ownable.sol";

contract KlayverToken is KIP7, KIP7Burnable, Pausable, Ownable {
    constructor(string memory _tokenName, string memory _tokenSymbol) KIP7(_tokenName, _tokenSymbol) {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(KIP7, KIP7Burnable)
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function burnToken(uint256 _amount, address _owner)  external {
        burnFrom(_owner, _amount);
    }

    function retrieveTokenBalance(address _owner) external view returns (uint256) {
        return balanceOf(_owner);
    }

    function retriveUserTokenBalance(address _owner) external view returns (uint256) {
        return balanceOf(_owner);
    }
}
