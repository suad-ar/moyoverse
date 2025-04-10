import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Moyoverse!</h1>
      <Link to="/game">
        <button>Start Journey</button>
      </Link>
    </div>
  );
};

export default HomePage;