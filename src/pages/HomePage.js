import React from 'react';
import { Link } from 'react-router-dom';
import useTimeOnPage from '../hooks/useTimeOnPage';

const HomePage = () => {
  useTimeOnPage('time_on_homepage');
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