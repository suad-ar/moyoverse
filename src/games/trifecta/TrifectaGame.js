import React, { useState } from 'react';
import './TrifectaGame.css';
import easyRounds from "./rounds/EasyRounds";
import { Link } from 'react-router-dom';
import useTimeOnPage from '../../hooks/useTimeOnPage';
import { useEffect } from 'react';


const Trifecta = () => {
  useTimeOnPage('time_on_trifecta');

  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 2;
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const currentRound = easyRounds[currentRoundIndex];


  const handleSelect = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else if (selected.length < 3) {
      setSelected([...selected, index]);
    }
  };

  const handleSubmit = () => {
    const selectedFlags = selected.map((i) => currentRound.tiles[i]);
    const match = currentRound.answer.every((flag) => selectedFlags.includes(flag)) &&
      selectedFlags.every((flag) => currentRound.answer.includes(flag));

      window.plausible("match_submitted", {
        props: {
          game: "Trifecta",
          correct: true, // or false based on your logic
          // optional
        },
      });

    if (match) {
      setMessage(currentRound.commonality); // Show the fun fact / answer
      setGameCompleted(true); // Allow moving to the next round
    } else {
      const nextAttempt = attempts + 1;
      setAttempts(nextAttempt);

      if (nextAttempt >= maxAttempts) {
        setMessage("No more attempts left!");
        setGameCompleted(true); // Optionally disable the game
      } else {
        setMessage(`Try again! You have ${maxAttempts - nextAttempt} attempt(s) left.`);
      }
    }
  };

  const handleNextRound = () => {
    if (currentRoundIndex < easyRounds.length - 1) {
      setCurrentRoundIndex(currentRoundIndex + 1);
      setSelected([]);
      setMessage('');
      setAttempts(0);
      setGameCompleted(false);
    } else {
      setMessage("🎉 You've completed all rounds!");
    }
  };

  useEffect(() => {
    window.plausible?.("game_played", { props: { name: "Trifecta" } });
  }, []);

  


  return (
    <div className="trifecta-container">
      <h2 className="trifecta-heading">{currentRound.title}</h2>
      <h2 className="trifecta-clue">{currentRound.clue}</h2>
      
      <div className="trifecta-board">
        {currentRound.tiles.map((flag, index) => (
          <div
            key={index}
            className={`trifecta-tile ${selected.includes(index) ? 'selected' : ''}`}
            onClick={() => handleSelect(index)}
          >
            <img src={`/images/flags/${flag}.png`} alt={flag} />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-button">Submit</button>
      {message && <div className="result-message">{message}</div>}
      <div className="navigation-buttons">
        <Link to="/">
          <button className="nav-btn"> Home</button>
        </Link>
        <Link to="/game">
          <button className="nav-btn">Game Page</button>
        </Link>
        {gameCompleted && (<button className="nav-btn" onClick={handleNextRound}>  Next Round </button>)}
      </div>

    </div>

  );
};

export default Trifecta;

