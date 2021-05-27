import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Library = (props) => (
  <tr>
    <td>{props.studymethod.name}</td>
    <td>{props.studymethod.description}</td>
    <td>{props.studymethod.studytime}</td>
    <td>{props.studymethod.breaktime}</td>
    <td>
      <Link to={"/timer/" + props.studymethod._id}>Start</Link> |{" "}
      <Link to={"/studymethod-edit/" + props.studymethod._id}>edit</Link> |{" "}
      <a
        href="#!"
        onClick={() => {
          props.deleteStudyMethod(props.studymethod._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class LibraryList extends Component {
  constructor(props) {
    super(props);

    this.deleteStudyMethod = this.deleteStudyMethod.bind(this);

    this.state = {
      library: []
    };
  }

  componentDidMount() {
    //react always run this code when mounting the component
    axios
      .get("https://team-eleven-backend.herokuapp.com/library/")
      .then((response) => {
        this.setState({
          library: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteStudyMethod(id) {
    axios
      .delete("https://team-eleven-backend.herokuapp.com/library/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      library: this.state.library.filter((el) => el._id !== id)
    });
  }

  libraryList() {
    return this.state.library.map((currentStudyMethod) => {
      return (
        <Library
          studymethod={currentStudyMethod}
          deleteStudyMethod={this.deleteStudyMethod}
          key={currentStudyMethod._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Library of Study Methods</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Study Time</th>
              <th>Break Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.libraryList()}</tbody>
        </table>
      </div>
    );
  }
}
