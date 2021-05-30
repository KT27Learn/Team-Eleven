import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateRooms extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStudyMethod = this.onChangeStudyMethod.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: "",
      studymethod: "",
      subject: "",
      studymethods: []
    };
  }

  componentDidMount() {
    //react always run this code when mounting the component

    axios
      .get("http://localhost:5000/library/")
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
      username: this.props.user,
      description: this.state.description,
      studymethod: this.state.studymethod,
      subject: this.state.subject
    };

    console.log(room);

    axios
      .post("http://localhost:5000/rooms/add", room)
      .then((res) => console.log(res.data));

    console.log(room);

    this.setState({
      studymethod: ""
    });

    this.props.history.push("/");
  }

  render() {
    return (
      <div>
      {this.props.user !== null ? (
        <>
        <h3>Create New Study Room</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.props.user}
            />
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
              value="Create Study Room"
              className="btn btn-primary"
            />
          </div>
        </form>
        </>
      ) : (
        <>
        <h3>You are not signed in!</h3>
        <p>You are not authorised to create a study room until you sign in!</p>
        </>
      )}
      </div>
    );
  }
}