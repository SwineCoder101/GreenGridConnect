//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/YourContract.sol";
import "./DeployHelpers.s.sol";
import "../contracts/TEC.sol";
import "../contracts/Marketplace.sol";
import "../contracts/Treasury.sol";
import "../contracts/OrderManagement.sol";
import {EURe} from "../contracts/EURe.sol";


contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        vm.startBroadcast(deployerPrivateKey);

        EURe eureToken = new EURe();
        // TEC tec = new TEC();
        // Marketplace marketplace = new Marketplace(tec);
        // Treasury treasury = new Treasury();
        // OrderManagement orderManagement = new OrderManagement();



        // output addresses of deployed contracts
        console.logString(
            string.concat(
                "EUReToken deployed at: ", vm.toString(address(eureToken))
            )
        );
        // console.logString(
        //     string.concat(
        //         "TEC deployed at: ", vm.toString(address(tec))
        //     )
        // );
        // console.logString(
        //     string.concat(
        //         "Marketplace deployed at: ", vm.toString(address(marketplace))
        //     )
        // );
        // console.logString(
        //     string.concat(
        //         "Treasury deployed at: ", vm.toString(address(treasury))
        //     )
        // );
        // console.logString(
        //     string.concat(
        //         "OrderManagement deployed at: ", vm.toString(address(orderManagement))
        //     )
        // );

        // console.logString(
        //     string.concat(
        //         "YourContract deployed at: ", vm.toString(address(yourContract))
        //     )
        // );
        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}
