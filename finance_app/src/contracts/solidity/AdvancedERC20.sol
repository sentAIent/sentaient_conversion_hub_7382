// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AdvancedERC20 is ERC20, ERC20Burnable, Ownable {
    uint8 private _decimals;
    bool public isMintable;
    
    // Tax structures
    uint256 public buyTax;
    uint256 public sellTax;
    address public taxWallet;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimals_,
        address owner,
        bool mintable_,
        uint256 buyTax_,
        uint256 sellTax_,
        address taxWallet_
    ) ERC20(name, symbol) Ownable(owner) {
        _decimals = decimals_;
        isMintable = mintable_;
        buyTax = buyTax_;
        sellTax = sellTax_;
        taxWallet = taxWallet_ == address(0) ? owner : taxWallet_;

        _mint(owner, initialSupply * (10 ** decimals_));
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(isMintable, "Minting is disabled for this token");
        _mint(to, amount);
    }
    
    // Advanced developers can override _update (ERC20's hook in OZ v5) to implement taxes
    // We leave this structure open for users to customize in this file.
    
    // function _update(address from, address to, uint256 value) internal virtual override {
    //     // Basic mock tax implementation
    //     uint256 taxAmount = 0;
    //     if (buyTax > 0 && from != owner() && to != owner()) {
    //         taxAmount = (value * buyTax) / 10000; // basis points
    //     }
    //     
    //     if (taxAmount > 0) {
    //         super._update(from, taxWallet, taxAmount);
    //     }
    //     super._update(from, to, value - taxAmount);
    // }
}
