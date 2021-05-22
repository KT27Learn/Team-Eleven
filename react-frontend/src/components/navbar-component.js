import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Eleven-Logo-final.png';
import styles from '../Navbar.css'; 


export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="logo-img">
          <img src={logo} className="styles.img-fluid"/>
        </div>
        <Link to="/" className="navbar-brand">Rooms</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/library" className="nav-link">Library</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create-room" className="nav-link">Create Room </Link>
          </li>
          <li className="navbar-item">
          <Link to="/create-studymethod" className="nav-link">Create Study Method</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}