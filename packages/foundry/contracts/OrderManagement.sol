pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract OrderManagement is AccessControl {
    bytes32 public constant CONSUMER_ROLE = keccak256("CONSUMER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct Order {
        address buyer;
        uint256 amount;
        uint256 price;
        bool fulfilled;
    }

    uint256 public orderCount;
    mapping(uint256 => Order) public orders;

    event OrderCreated(uint256 indexed id, address indexed buyer, uint256 amount, uint256 price);
    event OrderFulfilled(uint256 indexed id);

    constructor() {
        grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        grantRole(ADMIN_ROLE, msg.sender);
    }

    function createOrder(uint256 amount, uint256 price) external {
        require(hasRole(CONSUMER_ROLE, msg.sender), "Must have consumer role to create order");
        orderCount++;
        orders[orderCount] = Order(msg.sender, amount, price, false);
        emit OrderCreated(orderCount, msg.sender, amount, price);
    }

    function fulfillOrder(uint256 id) external {
        Order storage order = orders[id];
        require(hasRole(ADMIN_ROLE, msg.sender), "Must have admin role to fulfill order");
        require(!order.fulfilled, "Order already fulfilled");

        // Order matching logic goes here

        order.fulfilled = true;
        emit OrderFulfilled(id);
    }

    function cancelOrder(uint256 id) external {
        Order storage order = orders[id];
        require(msg.sender == order.buyer, "Only buyer can cancel order");
        require(!order.fulfilled, "Order already fulfilled");

        delete orders[id];
    }

    function getOrderStatus(uint256 id) external view returns (bool) {
        return orders[id].fulfilled;
    }
}
