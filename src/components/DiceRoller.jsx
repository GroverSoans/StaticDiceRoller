import React, { useState } from 'react';

const DiceRoller = () => {
  const [numOfDice, setNumOfDice] = useState(1);
  const [diceResults, setDiceResults] = useState([]);

  // Function to fetch random dice rolls from the backend
  const rollDice = async () => {
    const results = [];
    for (let i = 0; i < numOfDice; i++) {
      try {
        const response = await fetch('/api/rollDice');
        const data = await response.json();
        results.push(data.diceValue);
      } catch (error) {
        console.error('Error fetching dice value:', error);
      }
    }
    setDiceResults(results);
  };

  const handleDiceInputChange = (e) => {
    setNumOfDice(Number(e.target.value));
  };

  return (
    <div>
      <div id="container">
        <h1>Dice Roller</h1>
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
        <button onClick={rollDice}>Roll Dice</button>
        <div id="diceResults">
          <h2>Results:</h2>
          <ul>
            {diceResults.map((result, index) => (
              <li key={index}>Dice {index + 1}: {result}</li>
            ))}
          </ul>
        </div>
        <div id="diceImages">
        </div>
      </div>
    </div>
  );
};

export default DiceRoller;
