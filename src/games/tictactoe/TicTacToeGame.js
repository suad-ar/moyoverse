import React, { useState, useEffect, useCallback } from 'react';
import './TicTacToeGame.css';
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
  const [isDraw, setIsDraw] = useState(false);
 



  const handleClick = useCallback((i) => {
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
    if (!winData && !newBoard.includes(null)) {
      // It's a draw!
      setIsDraw(true);
      const boardEl = document.querySelector(".board");
      if (boardEl) {
        boardEl.classList.add("jolt");
        setTimeout(() => boardEl.classList.remove("jolt"), 500);
      }
    }

  }, [board, xIsNext, winnerInfo.winner]);

  const makeAIMove = useCallback(() => {
    const emptyIndices = board
      .map((val, idx) => val === null ? idx : null)
      .filter(idx => idx !== null);

    if (emptyIndices.length === 0) return;

    const tryMove = (symbol) => {
      for (let idx of emptyIndices) {
        const testBoard = [...board];
        testBoard[idx] = symbol;
        if (calculateWinner(testBoard)) return idx;
      }
      return null;
    };

    // 1. Try to win
    let aiMove = tryMove("O");

    // 2. Try to block player
    if (aiMove === null) aiMove = tryMove("X");

    // 3. Pick random if no immediate win/block
    if (aiMove === null) {
      const randomIndex = Math.floor(Math.random() * emptyIndices.length);
      aiMove = emptyIndices[randomIndex];
    }

    setTimeout(() => handleClick(aiMove), 500);
  }, [board, handleClick]); // Dependencies: the board and handleClick


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
    const aiWon = winnerInfo.winner === "O";
    const sparkleClass = aiWon ? "sparkle-red" : "sparkle-blue";

    return (
      <div
        key={i}
        className={`square ${isWinningSquare ? sparkleClass : ''}`}
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
    setIsDraw(false);
  };



  useEffect(() => {
    if (!xIsNext) {
      makeAIMove();
    }
  }, [xIsNext, makeAIMove]); // Watch for changes in xIsNext and makeAIMove



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
      {!winnerInfo.winner && !isDraw && (
        <Link to="/game">
        <button>Back</button>
      </Link>
      )}
      
      {/* Back + Play Again for a draw */}
{isDraw && (
  <div className="button-group">
    <Link to="/game">
      <button>Back</button>
    </Link>
    <button onClick={resetGame}>Play Again</button>
  </div>
)}


    </div>

  );

};

export default TicTacToeGame;
