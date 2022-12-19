# Web3 Frontend Challenge

The goal of this challenge is to get some insight into how you handle the challenges of Web3 frontends, particularly 
in blockchain interaction, state management and error state handling.

## The Setup

This repo contains a set of smart contracts that have been deployed on Avalanche Fuji testnet. The contracts include:
* `FooToken.sol`
* `BarToken.sol`
* `Exchange.sol`

These contracts represent a simplified decentralized exchange (DEX), where FOO tokens can be swapped for BAR tokens and 
the other way around. Unlike real DEX's, the FooBar exchange only swaps tokens at a fixed exchange rate (which can 
be upgraded by the smart contract owner).

The goal is to create a frontend UI that allows users to interact with the exchange contract to swap FOO and BAR 
tokens. With this frontend, users should be able to:
* Connect a Metamask wallet
* View their balance of FOO tokens
* View their balance of BAR tokens
* 
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