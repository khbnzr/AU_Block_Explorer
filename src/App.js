import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

import { Transactions } from "./Transactions";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [timestamp, setTimestamp] = useState();
  const [txns, setTxns] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
      // setTxn(await alchemy.core.getBlockWithTransactions(blockNumber));
    }
    getBlockNumber();
  });

  useEffect(() => {
    async function getTxns() {
      const block = await alchemy.core.getBlockWithTransactions(blockNumber);
      setTimestamp(block.timestamp);
      setTxns(block.transactions);
      // console.log("kn :::",timestamp);
    }
    getTxns();
  }, [blockNumber]);

  return (
    <div className="App">
      <h1>Block Number: {blockNumber}</h1>
      <h2>Timestamp : {timestamp && new Date(timestamp * 1_000).toLocaleString()}</h2>
      <h3>Transactions : {txns && txns.length}</h3>
      <hr />
      
      <Transactions transactions={txns} />
    </div>
  );
}

export default App;
