// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract TradableToken is ERC20, AccessControl {
    bytes32 public constant EXCHANGE_ROLE = keccak256("EXCHANGE_ROLE");

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function setExchange(address exchange) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(EXCHANGE_ROLE, exchange);
    }

    function mint(address to, uint256 amount) public onlyRole(EXCHANGE_ROLE) {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyRole(EXCHANGE_ROLE) {
        _burn(from, amount);
    }
}