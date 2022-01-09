import './App.css'
import React, { useEffect, useState } from 'react'
import web3 from './web3'
import lottery from './lottery'

function App() {
  // console.log(web3.version)
  // web3.eth.getAccounts().then(console.log)

  const [manager, setManager] = useState('')
  const [players, setPlayers] = useState([])
  const [balance, setBalance] = useState('') // Note: balance is not a number - it's an object (wrapped in a library called BignumberJS)
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getManager = async () => {
      // Don't need to set from argument because we're using the Metamask provider
      const manager = await lottery.methods.manager().call()
      const players = await lottery.methods.getPlayers().call()
      const balance = await web3.eth.getBalance(lottery.options.address)
      setManager(manager)
      setPlayers(players)
      setBalance(balance)
    }

    getManager()
  }, [manager, players, balance])

  const onSubmit = async (event) => {
    event.preventDefault()

    // Need to define from argument when using send method
    const accounts = await web3.eth.getAccounts()

    setMessage('Waiting on transaction success...')

    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether'),
      })
      setMessage('You have been entered!')
    } catch (error) {
      setMessage('Sorry, something went wrong')
    }
  }

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {manager}. There are currently {players.length} people entered, competing to win{' '}
        {web3.utils.fromWei(balance, 'ether')} ether!
      </p>
      <hr />

      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <button>Enter</button>
      </form>
      <hr />
      <h1>{message}</h1>
    </div>
  )
}
export default App
