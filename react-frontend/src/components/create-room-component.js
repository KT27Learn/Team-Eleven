import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateRooms extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStudyMethod = this.onChangeStudyMethod.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      studymethod: "",
      subject: "",
      users: [],
      studymethods: []
    };
  }

  componentDidMount() {
    //react always run this code when mounting the component
    axios
      .get("https://team-eleven-backend.herokuapp.com/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
            username: response.data[0].username
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://team-eleven-backend.herokuapp.com/library/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            studymethods: response.data.map((studymethod) => studymethod.name),
            studymethod: response.data[0].name
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeStudyMethod(e) {
    this.setState({
      studymethod: e.target.value
    });
  }

  onChangeSubject(e) {
    this.setState({
      subject: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const room = {
      username: this.state.username,
      description: this.state.description,
      studymethod: this.state.studymethod,
      subject: this.state.subject
    };

    console.log(room);

    axios
      .post("https://team-eleven-backend.herokuapp.com/rooms/add", room)
      .then((res) => console.log(res.data));

    console.log(room);

    this.setState({
      name: "",
      studymethod: ""
    });

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New Study Room</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Study Method: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.studymethod}
              onChange={this.onChangeStudyMethod}
            >
              {this.state.studymethods.map(function (studymethod) {
                return (
                  <option key={studymethod} value={studymethod}>
                    {studymethod}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Subject: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.subject}
              onChange={this.onChangeSubject}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
