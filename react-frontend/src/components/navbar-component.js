import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../Eleven-Logo-final.png";

export default class Navbar extends Component {

  constructor(props) {

    super(props);    
  
  }
  
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="logo-img">
          <img src={logo} className="styles.img-fluid" alt="eleven logo" />
        </div>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Rooms
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/library" className="nav-link">
                Library
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create-room" className="nav-link">
                Create Room{" "}
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create-studymethod" className="nav-link">
                Create Study Method
              </Link>
            </li>
              {this.props.user === null ? (
                <>
                <li className="navbar-item">
                  <Link to="/login" className="nav-link">
                    Log In
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
                </>
              ):(
                <>
                <li className="navbar-item">
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>
                </>
              )}
          </ul>
        </div>
      </nav>
    );
  }
}
