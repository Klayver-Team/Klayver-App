// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@klaytn/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract KlayContent is ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct Klay {
        string[] image;
        string post;
        address owner;
        uint256 klayId;
    }

    mapping(uint256 => Klay) private _klays;

    constructor() ERC721("KlayContent", "KCT") {}

    function createAKlay(string[] memory _newImage, string memory _newPost) external {
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

    function mintPost(uint256 klayId) external {
        require(_exists(klayId), "Token does not exist");
        require(ownerOf(klayId) != msg.sender, "Cannot mint your own post");

        // Implement your minting logic here
        // For example, you could transfer ownership of the post to the caller

        // Emit an event or perform any additional logic as needed

        // You can also customize this function based on your specific minting requirements
    }
}
