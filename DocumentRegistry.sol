//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract DocumentRegistry {
    struct Document{
        string docHash;
        address owner;
        uint timestamp;
    }

    mapping(string => Document) public documents;

    function registerDocument(string memory docHash) public {
        require(bytes(docHash).length > 0, "Hash required");
        documents[docHash] = Document(docHash, msg.sender, block.timestamp);
    }

    function verifyDocument (string memory docHash) public view returns (bool) {
        return documents[docHash].timestamp !=0;
    }
}