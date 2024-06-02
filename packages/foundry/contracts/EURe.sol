// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EURe is ERC20 {
    address public admin;

    constructor() ERC20("EURe Token", "EURe") {
        admin = msg.sender;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == admin, "EUReToken: only admin can mint");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        require(msg.sender == admin, "EUReToken: only admin can burn");
        _burn(from, amount);
    }

    function transferAdminRole(address newAdmin) external {
        require(msg.sender == admin, "EUReToken: only current admin can transfer admin role");
        admin = newAdmin;
    }
}
