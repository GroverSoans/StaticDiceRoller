import { useState } from 'react';
import './DiceRoller.css'

const DiceRoller = () => {
  const [numOfDice, setNumOfDice] = useState(1);
  const [diceResults, setDiceResults] = useState([]);
  const [selectedServer, setSelectedServer] = useState("node"); 
  const serverURLs = {
    node: 'https://serverdiceroller-test.azurewebsites.net/api/rollDice',
    go: 'https://gowebserver.wonderfulbay-ea07f76e.eastus.azurecontainerapps.io/api/rollDice'

  }


  const rollDice = async () => {
    const results = [];
    const url = serverURLs[selectedServer];

    console.log(`Fetching from: ${url}`);

    for (let i = 0; i < numOfDice; i++) {
      try {
        const response = await fetch(url); 
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        results.push(data.diceValue);
      } catch (error) {
        console.error('Error fetching dice value:', error);
        results.push('Error');
      }
    }
    setDiceResults(results);
  };

  const handleDiceInputChange = (e) => {
    setNumOfDice(Number(e.target.value));
  };

  const handleServerChange = (e) => {
    setSelectedServer(e.target.value);
  };

  return (
    <div id="container">
      <h1>Dice Roller</h1>
      <label>Select Server</label>
      <select value={selectedServer} onChange={handleServerChange}>
        <option value="go">Go Docker Server</option>
        <option value="node">Node.js Server</option>
      </select>
      <p>
        Welcome to the Dice Roller! Click the button below to roll as many
        6-sided dice as you please. The results will be displayed below.
      </p>
      <label>Number of Dice</label>
      <input
        type="number"
        id="numOfDice"
        value={numOfDice}
        onChange={handleDiceInputChange}
        min="1"
      />
      <button onClick={rollDice}> Roll Dice
      </button>
      <div id="diceResults">
        <h2>Results:</h2>
          {diceResults.map((result, index) => (
              <img
                key ={index}
                  src={`/diceImages/${result}.png`}
                  alt={`Dice ${result}`}
                  style={{ width: '150px', margin: '5px', display: 'inline-block' }} 
                />
          ))}
        
      </div>
    </div>
  );
};

export default DiceRoller;
