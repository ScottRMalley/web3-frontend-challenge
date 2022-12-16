// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./TradableToken.sol";

contract BarToken is TradableToken {
    constructor() TradableToken("Bar", "BAR") {}
}
