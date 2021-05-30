import React, { Component } from "react";

export default class StudySummary extends Component {

  constructor(props) {

    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit() {
    this.props.signOut();
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h1>Profile Details:</h1>
        <p>
            Username: {this.props.user} <br />
            Email: {this.props.email}
        </p>
        <div className="form-group">
            <input
                onClick={this.handleSubmit}
                value="Log Out"
                className="btn btn-primary"
            />
        </div>
      </div>
    );
  }
}
