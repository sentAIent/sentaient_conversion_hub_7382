// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./StandardERC20.sol";
import "./AdvancedERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenFactory is Ownable {
    uint256 public platformFee = 0.01 ether;
    address payable public feeWallet;

    event TokenCreated(
        address indexed tokenAddress,
        address indexed creator,
        string tokenType,
        string name,
        string symbol
    );

    constructor(address payable feeWallet_) Ownable(msg.sender) {
        feeWallet = feeWallet_;
    }

    function setPlatformFee(uint256 newFee) external onlyOwner {
        platformFee = newFee;
    }

    function setFeeWallet(address payable newWallet) external onlyOwner {
        feeWallet = newWallet;
    }

    // Pass fee=0 for subscribers, else msg.value must match platformFee
    function createStandardToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimals_,
        bool isSubscriber
    ) external payable returns (address) {
        if (!isSubscriber) {
            require(msg.value >= platformFee, "Insufficient fee");
            feeWallet.transfer(msg.value);
        } else {
            // Subscribers deploy for free (plus gas)
            require(msg.value == 0, "No fee required");
        }

        StandardERC20 newToken = new StandardERC20(
            name,
            symbol,
            initialSupply,
            decimals_,
            msg.sender
        );

        emit TokenCreated(address(newToken), msg.sender, "Standard", name, symbol);
        return address(newToken);
    }

    function createAdvancedToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimals_,
        bool mintable_,
        uint256 buyTax_,
        uint256 sellTax_,
        address taxWallet_,
        bool isSubscriber
    ) external payable returns (address) {
        if (!isSubscriber) {
            require(msg.value >= platformFee, "Insufficient fee");
            feeWallet.transfer(msg.value);
        } else {
            require(msg.value == 0, "No fee required");
        }

        AdvancedERC20 newToken = new AdvancedERC20(
            name,
            symbol,
            initialSupply,
            decimals_,
            msg.sender,
            mintable_,
            buyTax_,
            sellTax_,
            taxWallet_
        );

        emit TokenCreated(address(newToken), msg.sender, "Advanced", name, symbol);
        return address(newToken);
    }
}
