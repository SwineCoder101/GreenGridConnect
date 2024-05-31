pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// TEC is ERC20 token that represents a tokenized energy credit
// Producers can mint TECs and consumers can burn TECs
// Mint.club have bonding curves that allow users to mint and burn tokens, migrating to a new contract
// This could be a wrapper contract that allows for multiple utilities for the token and multiple stakeholders
contract TEC is ERC20, AccessControl {
    bytes32 public constant PRODUCER_ROLE = keccak256("PRODUCER_ROLE");
    bytes32 public constant CONSUMER_ROLE = keccak256("CONSUMER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    constructor() ERC20("Tokenized Energy Credit", "TEC") {
        grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        grantRole(ADMIN_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) external {
        require(hasRole(PRODUCER_ROLE, msg.sender), "Must have producer role to mint");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        require(hasRole(ADMIN_ROLE, msg.sender), "Must have admin role to burn");
        _burn(from, amount);
    }
}