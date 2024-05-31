pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Treasury is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    event Deposit(address indexed from, uint256 amount);
    event Withdrawal(address indexed to, uint256 amount);
    event RewardDistributed(address indexed to, uint256 amount);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
    }

    function deposit() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        require(hasRole(ADMIN_ROLE, msg.sender), "Only admin can withdraw");
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }

    function distributeReward(address to, uint256 amount) external {
        require(hasRole(ADMIN_ROLE, msg.sender), "Only admin can distribute rewards");
        payable(to).transfer(amount);
        emit RewardDistributed(to, amount);
    }

    function collectFee(uint256 amount) external {
        require(hasRole(ADMIN_ROLE, msg.sender), "Only admin can collect fees");
        payable(msg.sender).transfer(amount);
    }
}
