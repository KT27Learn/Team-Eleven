import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class StudySummary extends React.Component {
  render() {
    return (
      <div>
        <h1>Congrats ____!</h1>
        <p>You have logged in a total of ___ hours ___ minutes of work!</p>
        <p>You have completed ___ tasks!</p>
        <div>
          <Link to={"/library"}>Back to Library!</Link>
        </div>
      </div>
    );
  }
}
