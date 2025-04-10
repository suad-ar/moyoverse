import React from 'react';
import {Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage'; 
import GamePage from '../pages/GamePage';
import TicTacToeGame from '../games/tictactoe/TicTacToeGame';

const AppRouter = () => {
  return (
   
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/game/tictactoe" element={<TicTacToeGame />} />
      </Routes>
    
  );
};

export default AppRouter;