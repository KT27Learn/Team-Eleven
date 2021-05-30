import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Room = (props) => (
  <tr>
    <td>{props.room.username}</td>
    <td>{props.room.description}</td>
    <td>{props.room.studymethod}</td>
    <td>{props.room.subject}</td>
    <td>
      
      {props.signedInUser !== props.room.username ? (
        <>
        <td>Enter</td>
        </>
      ) : (
        <>
        Enter | <Link to={"/room-edit/" + props.room._id}>Edit</Link> | {" "}
        <a
          href="#!"
          onClick={() => {
            props.deleteRoom(props.room._id);
          }}
        >
          Delete
        </a>
        </>
      )}
      
    </td>
  </tr>
);

export default class RoomList extends Component {
  constructor(props) {
    super(props);

    this.deleteRoom = this.deleteRoom.bind(this);

    this.state = {
      rooms: []
    };
  }

  componentDidMount() {
    //react always run this code when mounting the component
    axios
      .get("http://localhost:5000/rooms/")
      .then((response) => {
        this.setState({
          rooms: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteRoom(id) {
    axios
      .delete("http://localhost:5000/rooms/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      rooms: this.state.rooms.filter((el) => el._id !== id)
    });
  }

  roomList() {
    return this.state.rooms.map((currentroom) => {
      return (
        <Room
          room={currentroom}
          signedInUser={this.props.user}
          deleteRoom={this.deleteRoom}
          key={currentroom._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Live Study Rooms</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Study Method</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.roomList()}</tbody>
        </table>
      </div>
    );
  }
}
