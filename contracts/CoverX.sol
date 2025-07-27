// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoverX {
    address public owner;
    mapping(address => bool) public isRegistered;

    event Registered(address indexed user);
    event InsuredTransfer(
        address indexed sender,
        address indexed receiver,
        uint256 amount,
        uint256 insuranceFee
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyRegistered() {
        require(isRegistered[msg.sender], "Not a registered CoverX member");
        _;
    }

    function register() public {
        require(!isRegistered[msg.sender], "Already registered");
        isRegistered[msg.sender] = true;
        emit Registered(msg.sender);
    }

    function insuredTransfer(address payable to) public payable onlyRegistered {
        require(isRegistered[to], "Receiver must be registered");
        require(msg.value > 0, "Amount must be greater than zero");

        uint256 insuranceFee = (msg.value * 2) / 100; // 2%
        uint256 amountAfterFee = msg.value - insuranceFee;

        payable(owner).transfer(insuranceFee); // Send insurance fee to pool (owner for now)
        to.transfer(amountAfterFee); // Send remaining to recipient

        emit InsuredTransfer(msg.sender, to, msg.value, insuranceFee);
    }
}
