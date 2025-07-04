// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract AIProxyNumber {
    address public owner;
    uint256 public price = 25 ether; // 25 FLOW

    mapping(address => bool) public hasAccess;

    event ProxyPurchased(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function purchaseProxyNumber() public payable {
        require(msg.value >= price, "Payment required");
        hasAccess[msg.sender] = true;

        emit ProxyPurchased(msg.sender, msg.value);
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }

    // Allow receiving ETH directly
    receive() external payable {
        // Optional: auto-grant access or emit event
        hasAccess[msg.sender] = true;
        emit ProxyPurchased(msg.sender, msg.value);
    }

    fallback() external payable {
        revert("Invalid call");
    }
}