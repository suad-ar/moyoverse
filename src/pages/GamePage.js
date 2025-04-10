import React from 'react';
import { Link } from 'react-router-dom';
import './GamePage.css';


const GamePage = () => {
    return (
        <div className="game-page">
            <h1>Game Page</h1>
            <h2> Browse our selection of games. <br></br>Stay tuned for more!</h2>
            <div className="game-tiles">
                <div className="game-tile">
                    <img src="/images/fool.jpg" alt="Tic Tac Toe" className="game-image" />
                    <h3>Tic Tac Toe</h3>
                    <Link to="/game/tictactoe">
                        <button className="play-button">Play</button>
                    </Link>
                </div>
                <div className="game-tile coming-soon">
                    <img src="/images/money.jpg" alt="Coming Soon" className="game-image" />
                    <h3>Tic Tac Two</h3>
                    <button disabled className="play-button">Coming Soon</button>
                </div>
            </div>
            <Link to="/">
                <button>Back to Reality</button>
            </Link>
        </div>

    );
};

export default GamePage;