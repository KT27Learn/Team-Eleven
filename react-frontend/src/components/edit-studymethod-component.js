import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class EditStudyMethod extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStudyTime = this.onChangeStudyTime.bind(this);
    this.onChangeBreakTime = this.onChangeBreakTime.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      description: "",
      studytime: 0,
      breaktime: 0
    };
  }

  componentDidMount() {
    //react always run this code when mounting the component
    axios
      .get("https://orbital-eleven-backend.herokuapp.com/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          description: response.data.description,
          studytime: response.data.studytime,
          breaktime: response.data.breaktime
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeStudyTime(e) {
    this.setState({
      studytime: e.target.value
    });
  }

  onChangeBreakTime(e) {
    this.setState({
      breaktime: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const studymethod = {
      name: this.state.name,
      description: this.state.description,
      studytime: this.state.studytime,
      breaktime: this.state.breaktime
    };

    console.log(studymethod);

    axios
      .post(
        "https://orbital-eleven-backend.herokuapp.com/library/update/" + this.props.match.params.id,
        studymethod
      )
      .then((res) => console.log(res.data));

    console.log(studymethod);

    window.location = "/library";
  }

  render() {
    return (
      <div>
        <h3>Edit Study Method</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
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
            <label>Study Interval: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.studytime}
              onChange={this.onChangeStudyTime}
            />
          </div>
          <div className="form-group">
            <label>Break Interval: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.breaktime}
              onChange={this.onChangeBreakTime}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Study Method"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}