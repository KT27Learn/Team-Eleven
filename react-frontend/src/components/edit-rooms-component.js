import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class EditRooms extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStudyMethod = this.onChangeStudyMethod.bind(this);
    this.onChangesubject = this.onChangeSubject.bind(this);
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
      .get("https://orbital-eleven-backend.herokuapp.com/rooms/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          studymethod: response.data.studymethod,
          subject: response.data.subject
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://orbital-eleven-backend.herokuapp.com/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username)
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://orbital-eleven-backend.herokuapp.com/library/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            studymethods: response.data.map((studymethod) => studymethod.name)
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
      .post(
        "https://orbital-eleven-backend.herokuapp.com/rooms/update/" + this.props.match.params.id,
        room
      )
      .then((res) => console.log(res.data));

    console.log(room);

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Room Details</h3>
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
              value="Edit Room Details"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
