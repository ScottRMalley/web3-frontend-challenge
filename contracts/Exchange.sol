// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./TradableToken.sol";

contract Exchange {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    address public tokenA;
    address public tokenB;
    uint256 public exchangeRate;

    event Swap(address indexed _from, address _tokenA, address _tokenB, uint256 _amount);

    constructor(address tokenA_, address tokenB_, uint256 exchangeRate_){
        tokenA = tokenA_;
        tokenB = tokenB_;
        exchangeRate = exchangeRate_;
    }

    function swap(address fromToken, address toToken, uint256 amount) public returns (uint256){
        require(fromToken == tokenA || fromToken == tokenB, "Exchange: must use valid from token");
        require(toToken == tokenB || toToken == tokenA, "Exchange: must use valid to token");
        require(fromToken != toToken, "Exchange: cannot swap token for itself");

        if (fromToken == tokenA) {
            _swapAForB(msg.sender, amount);
        } else {
            _swapBforA(msg.sender, amount);
        }
        return 1;
    }

    function _swapAForB(address from, uint256 amount) internal {
        IERC20(tokenA).safeTransferFrom(from, address(this), amount);
        TradableToken(tokenA).burn(address(this), amount);
        TradableToken(tokenB).mint(msg.sender, amount.mul(exchangeRate));
        emit Swap(msg.sender, tokenA, tokenB, amount);
    }

    function _swapBforA(address from, uint256 amount) internal {
        IERC20(tokenB).safeTransferFrom(from, address(this), amount);
        TradableToken(tokenB).burn(address(this), amount);
        TradableToken(tokenA).mint(msg.sender, amount.div(exchangeRate));
        emit Swap(msg.sender, tokenA, tokenB, amount);
    }
}