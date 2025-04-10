import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const affirmations = [
  "It is not sufficient that i succeed - all others must fail.💫",
  "The man who sleeps with a machete is a fool every night, but one.🧠",
  "No matter how hot your anger is, it cannot cook yams 🔥",
  "Plenty talking cannot let a dead man hear you 🚀"
];

const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState({ winner: null, line: [] });
  const [showAffirmation, setShowAffirmation] = useState(false);
  const [affirmation, setAffirmation] = useState("");

  const handleClick = (i) => {
    if (board[i] || winnerInfo.winner) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    const winData = calculateWinner(newBoard);
    if (winData) {
      setWinnerInfo(winData);
      setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
      setShowAffirmation(true);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line };
      }
    }
    return null;
  };

  const renderSquare = (i) => {
    const isWinningSquare = winnerInfo.line.includes(i);
    return (
      <div
        key={i}
        className={`square ${isWinningSquare ? 'sparkle' : ''}`}
        onClick={() => handleClick(i)}
      >
        {board[i]}
      </div>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinnerInfo({ winner: null, line: [] });
    setShowAffirmation(false);
    setAffirmation("");
  };

  return (
    <div className="tic-tac-toe">
  
      <h2>{winnerInfo.winner ? `Winner: ${winnerInfo.winner}` : `Turn: ${xIsNext ? 'X' : 'O'}`}</h2>
      <div className="board">
        {board.map((_, i) => renderSquare(i))}
      </div>

      {showAffirmation && (
        <div className="affirmation-popup">
          <p>{affirmation}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
  
};

export default TicTacToeGame;
