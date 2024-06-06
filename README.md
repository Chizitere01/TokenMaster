Sure! Here is a detailed `README.md` file for your GitHub repository, explaining the functionalities of the `TokenMaster` smart contract.

---

# TokenMaster

TokenMaster is a decentralized application (dApp) similar to Ticketmaster.com, enabling users to purchase tickets by interacting with the blockchain. The tickets are represented as NFTs (Non-Fungible Tokens) using the ERC721 standard from OpenZeppelin.

## Table of Contents

- [Overview](#overview)
- [Smart Contract](#smart-contract)
  - [Features](#features)
  - [Functions](#functions)
- [Deployment](#deployment)
- [Testing](#testing)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Overview

TokenMaster allows users to list events and buy tickets for these events. Each ticket is minted as an NFT, ensuring the uniqueness and ownership of each ticket. The contract owner (deployer) has special permissions to list events and withdraw funds.

## Smart Contract

The smart contract is written in Solidity and uses the OpenZeppelin library for ERC721 token functionality.

### Features

- **Event Listing**: Only the contract owner can list new events.
- **Ticket Purchase**: Users can purchase tickets for listed events. Each ticket is an NFT.
- **Ownership Management**: The contract owner can withdraw the collected funds.

### Functions

#### list

```solidity
function list(
    string memory _name,
    uint256 _cost,
    uint256 _maxTickets,
    string memory _date,
    string memory _time,
    string memory _location
) public onlyOwner
```

Lists a new event. Only callable by the contract owner.

#### mint

```solidity
function mint(uint _id, uint256 _seat) public payable
```

Allows users to buy tickets for a specific event. Each ticket is an NFT.

#### getOccasion

```solidity
function getOccasion(uint256 _id) public view returns (Occasion memory)
```

Returns details of a specific event.

#### getSeatsTaken

```solidity
function getSeatsTaken(uint256 _id) public view returns (uint256[] memory)
```

Returns the list of seats taken for a specific event.

#### withdraw

```solidity
function withdraw() public onlyOwner
```

Allows the contract owner to withdraw funds collected from ticket sales.

## Deployment

To deploy the contract, use the `deploy.js` script located in the `scripts` directory.

```bash
npx hardhat run scripts/deploy.js --network <network_name>
```

Replace `<network_name>` with the name of the network you want to deploy to (e.g., `rinkeby`, `mainnet`).

## Testing

To run the tests for the smart contract, use the following command:

```bash
npx hardhat test
```

Ensure you have configured your test environment correctly in `hardhat.config.js`.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Chizitere01/TokenMaster.git
   cd TokenMaster
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

## Usage

1. **Compile the contract**:

   ```bash
   npx hardhat compile
   ```

2. **Deploy the contract**:

   ```bash
   npx hardhat run scripts/deploy.js --network <network_name>
   ```

3. **Interact with the contract**:
   - Use the Hardhat console or write scripts to interact with the deployed contract.
   - Ensure to update the contract address and other relevant details in your interaction scripts.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
