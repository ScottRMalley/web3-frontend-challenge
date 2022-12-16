// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./TradableToken.sol";

contract FooToken is TradableToken {
    mapping(address => bool) private _users;
    uint256 public constant DEFAULT_FUND_AMOUNT = 100000000000000000000;

    constructor() TradableToken("Foo", "FOO") {}

    function fund() public returns (uint) {
        require(!_users[msg.sender], "FooToken: address already funded");
        _mint(msg.sender, DEFAULT_FUND_AMOUNT);
        _users[msg.sender] = true;
        return 1;
    }

    function funded(address user) public view returns (bool) {
        return _users[user];
    }
}
