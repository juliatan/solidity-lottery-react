## About

- This is a test project that I've written to learn how to integrate a React frontend to a Solidity smart contract.
- It's a smart contract that allows players to enter a lottery that picks a random winner. You can view the repo [here](https://github.com/juliatan/solidity-lottery).
- This app requires the user to have the Metamask extension installed.

### Packages

- Web3 (JavaScript interface to Ethereum blockchain)

### To run

- `yarn start` - start the app

### Improvement points

As this is just practice, I haven't spent time really fortifying the app. Some improvement points include:

- Text input does not validate user's input
- Should only show "pick winner" button if the user is the manager of the contract
- More intuitive error messages if something goes wrong
