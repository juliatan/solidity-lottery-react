import './App.css'
import React, { useEffect, useState } from 'react'
import web3 from './web3'
import lottery from './lottery'

function App() {
  // console.log(web3.version)
  // web3.eth.getAccounts().then(console.log)

  const [manager, setManager] = useState('')
  const [players, setPlayers] = useState([])
  const [balance, setBalance] = useState('') // Note: balance is not a number - it's an object

  useEffect(() => {
    const getManager = async () => {
      const manager = await lottery.methods.manager().call()
      const players = await lottery.methods.getPlayers().call()
      const balance = await web3.eth.getBalance(lottery.options.address)
      setManager(manager)
    }

    getManager()
  }, [])

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {manager}. There are currently {players.length} people entered, competing to win{' '}
        {web3.utils.fromWei(balance, 'ether')} ether!
      </p>
    </div>
  )
}
export default App
