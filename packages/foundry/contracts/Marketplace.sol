pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./TEC.sol";

// Marketplace contract that allows producers to create listings and consumers to purchase TECs
// Admin can create listings and purchase TECs
// Admin can grant and revoke roles
contract Marketplace is AccessControl {
    bytes32 public constant PRODUCER_ROLE = keccak256("PRODUCER_ROLE");
    bytes32 public constant CONSUMER_ROLE = keccak256("CONSUMER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    //expand on listing details
    struct Listing {
        address seller;
        uint256 amount;
        uint256 price;
        bool active;
    }

    TEC public tec;
    uint256 public listingCount;
    mapping(uint256 => Listing) public listings;

    event ListingCreated(uint256 indexed id, address indexed seller, uint256 amount, uint256 price);
    event ListingCancelled(uint256 indexed id);
    event TECsPurchased(uint256 indexed id, address indexed buyer, uint256 amount);

    constructor(TEC _tec) {
        tec = _tec;
        grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        grantRole(ADMIN_ROLE, msg.sender);
    }

    function createListing(uint256 amount, uint256 price) external {
        require(hasRole(PRODUCER_ROLE, msg.sender), "Must have producer role to create listing");
        listingCount++;
        listings[listingCount] = Listing(msg.sender, amount, price, true);
        emit ListingCreated(listingCount, msg.sender, amount, price);
    }

    function purchaseTECs(uint256 id) external payable {
        require(hasRole(CONSUMER_ROLE, msg.sender), "Must have consumer role to purchase TECs");
        Listing storage listing = listings[id];
        require(listing.active, "Listing is not active");
        require(msg.value == listing.price, "Incorrect value sent");

        tec.transferFrom(listing.seller, msg.sender, listing.amount);
        payable(listing.seller).transfer(msg.value);
        listing.active = false;

        emit TECsPurchased(id, msg.sender, listing.amount);
    }

    function cancelListing(uint256 id) external {
        Listing storage listing = listings[id];
        require(msg.sender == listing.seller, "Only seller can cancel listing");
        require(listing.active, "Listing is not active");

        listing.active = false;
        emit ListingCancelled(id);
    }

    function getListings() external view returns (Listing[] memory) {
        Listing[] memory activeListings = new Listing[](listingCount);
        uint256 count = 0;

        for (uint256 i = 1; i <= listingCount; i++) {
            if (listings[i].active) {
                activeListings[count] = listings[i];
                count++;
            }
        }
        return activeListings;
    }
}