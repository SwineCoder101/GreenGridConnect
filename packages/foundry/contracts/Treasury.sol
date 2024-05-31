pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

// Treasury contract that allows admin to collect fees and distribute rewards
// Admin can collect fees and distribute rewards to producers and consumers
// Admin can also grant and revoke roles
// Mint.club have bonding curves that allow users to mint and burn tokens, fee collections will be sent to this contract to distribute rewards
contract Treasury is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    event Deposit(address indexed from, uint256 amount);
    event Withdrawal(address indexed to, uint256 amount);
    event RewardDistributed(address indexed to, uint256 amount);

    constructor() {
        grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        grantRole(ADMIN_ROLE, msg.sender);
    }

    function deposit() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function distributeReward(address to, uint256 amount) external {
        require(hasRole(ADMIN_ROLE, msg.sender), "Only admin can distribute rewards");
        payable(to).transfer(amount);
        // add logic for reward distribution, decide on rewards for producers and consumers
        emit RewardDistributed(to, amount);
    }

    function collectFee(uint256 amount) external {
        require(hasRole(ADMIN_ROLE, msg.sender), "Only admin can collect fees");
        // add logic for fee collection
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }
}
