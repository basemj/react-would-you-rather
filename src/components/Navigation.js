import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from "react-bootstrap";

const Navigation = () => {
  return (
    <Nav className="mr-auto">
      <Nav.Link exact as={NavLink} to="/">Home</Nav.Link>
      <Nav.Link exact as={NavLink} to="/new-question">New Question</Nav.Link>
      <Nav.Link exact as={NavLink} to="/leaderboard">Leaderboard</Nav.Link>
    </Nav>
  );
};

export default Navigation;
