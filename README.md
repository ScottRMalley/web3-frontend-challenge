# Web3 Frontend Challenge

The goal of this challenge is to get some insight into how you handle the challenges of Web3 frontends, particularly 
in blockchain interaction, state management and error state handling.

## The Setup

This repo contains a set of smart contracts that have been deployed on Avalanche Fuji testnet. The contracts include:
* `FooToken.sol` - a standard ERC20 contract
* `BarToken.sol` - a standard ERC20 contract
* `Exchange.sol` - a contract that can swap FOO for BAR

These contracts represent a simplified decentralized exchange (DEX), where FOO tokens can be swapped for BAR tokens and 
the other way around. Unlike real DEX's, the FooBar exchange only swaps tokens at a fixed exchange rate (which can 
only be updated by the smart contract owner).

The goal is to create a frontend UI that allows users to interact with the exchange contract to swap FOO and BAR 
tokens. Initially, users will not have any tokens they can use on the exchange, therefore, an initial function has 
been created on the FOO token, that allows first time users to request a default minting of 100 tokens. In Solidity, 
the function looks like this:
```solidity
function fund() public returns (uint);
function funded(address user) public view returns (bool);
```
The `fund()` function will only mint tokens to users who have not already recieved them, therefore the utility method 
`funded(address user)` should be used to determine whether the user has already claimed their free tokens.

Once users have some FOO tokens, they can call the relevant function on the `Exchange.sol` contract:
```solidity
function swap(address fromToken, address toToken, uint256 amount) public returns (uint256);
```
The swap function can only be called if the user has approved the `Exchange` contract to spend their FOO or BAR 
tokens. This can be done using the standard ERC20 `approve(spender, amount)` functions on the tokens (see below for 
some examples).

To sumarize, with this frontend, users should be able to:

* Connect their Metamask wallet
* Request an initial minting of FOO tokens
* View their balance of FOO tokens
* View their balance of BAR tokens
* Swap FOO tokens for BAR tokens and vice versa

## Connecting to the Smart Contracts

You can connect to the smart contracts using the ABI's generated in this repo upon building.
```shell
yarn install
hardhat export --network avax_fuji --export addresses/avax-testnet.json
```

This should create a folder structure with a JSON containing all the ABI's:
```shell
ls ./build/addresses
avax-testnet.json <--- ABI's are in here
```
Alternatively, this repository can be installed directly in the NextJS/React project using:
```shell
yarn add 
```