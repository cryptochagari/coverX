// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoverX {
    struct User {
        bool registered;
    }

    mapping(address => User) public users;

    event Registered(address indexed user);
    event InsuredTransaction(address indexed from, address indexed to, uint256 amount, uint256 insuranceFee);

    address public owner;
    uint256 public insurancePercent = 2; // e.g., 2%

    constructor() {
        owner = msg.sender;
    }

    modifier onlyRegistered() {
        require(users[msg.sender].registered, "User not registered");
        _;
    }

    function register() public {
        if (!users[msg.sender].registered) {
            users[msg.sender] = User(true);
            emit Registered(msg.sender);
        }
    }

    function sendWithInsurance(address payable recipient) public payable onlyRegistered {
        require(users[recipient].registered, "Recipient not registered");
        require(msg.value > 0, "Must send value");

        uint256 fee = (msg.value * insurancePercent) / 100;
        uint256 amountAfterFee = msg.value - fee;

        payable(owner).transfer(fee);         // Insurance fee to CoverX
        recipient.transfer(amountAfterFee);   // Send the rest to recipient

        emit InsuredTransaction(msg.sender, recipient, msg.value, fee);
    }

    function isRegistered(address user) public view returns (bool) {
        return users[user].registered;
    }

    function setInsurancePercent(uint256 _percent) public {
        require(msg.sender == owner, "Not authorized");
        insurancePercent = _percent;
    }
}
