// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@klaytn/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract KlayContent is ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct Klay {
        string image;
        string post;
        address owner;
        uint256 klayId;
    }

    mapping(uint256 => Klay) private _klays;

    constructor() ERC721("KlayContent", "KCT") {}

    modifier tokenExists(uint256 klayId) {
        require(_exists(klayId), "Token does not exist");
        _;
    }

    modifier onlyTokenOwner(uint256 klayId) {
        require(ownerOf(klayId) == msg.sender, "Not the owner of the token");
        _;
    }

    function createAKlay(string memory _newImage, string memory _newPost) external {
        uint256 newTokenId = _tokenIdCounter.current();
        _safeMint(msg.sender, newTokenId);

        Klay storage newKlay = _klays[newTokenId];
        newKlay.image = _newImage;
        newKlay.post = _newPost;
        newKlay.owner = msg.sender;
        newKlay.klayId = newTokenId;

        _tokenIdCounter.increment();
    }

    function retrieveKlays() external view returns (Klay[] memory) {
        uint256 totalKlays = totalSupply();
        Klay[] memory result = new Klay[](totalKlays);

        for (uint256 i = 0; i < totalKlays; i++) {
            result[i] = _klays[tokenByIndex(i)];
        }

        return result;
    }

    function mintPost(uint256 klayId) external tokenExists(klayId) onlyTokenOwner(klayId) {
        Klay storage klay = _klays[klayId];

        // Implement your minting logic here
        // For example, transfer ownership of the post to the caller
        klay.owner = msg.sender;

        // Emit an event or perform any additional logic as needed
        emit PostMinted(msg.sender, klayId);

        // You can also customize this function based on your specific minting requirements
    }

    // Event to log post minting
    event PostMinted(address indexed minter, uint256 indexed klayId);
}
