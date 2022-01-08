import Web3 from 'web3'

// Opens Metamask wallet connection
window.ethereum.request({ method: 'eth_requestAccounts' })
// Allows us to hijack the web3 instance Metamask automatically comes with, so we can be sure we're using the latest version of Web3.
const web3 = new Web3(window.ethereum)

export default web3
