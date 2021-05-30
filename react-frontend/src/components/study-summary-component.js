import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class StudySummary extends Component {
  constructor(props) {

    super(props);
    this.state = {

      hours: 0,
      minutes: 0
      
    }

  }

  componentDidMount() {
    
    if (this.props.studyHours < 3600) {

      this.setState({
        minutes: Math.ceil(this.props.studyHours / 60)
      });

    } else {

      this.setState({
        minutes: Math.ceil((this.props.studyHours % 3600) / 60),
        hours: this.props.studyHours - (this.props.studyHours % 3600)
      });

    }

  }

  render() {
    return (
      <div>
        <h1>
          Congrats {this.props.user === null ? "John Doe": this.props.user}!
        </h1>
        {}
        <p> 
          You have logged in a total of {this.state.hours} {this.state.hours === 1 ? "hour" : "hours"} , {this.state.minutes} {this.state.minutes === 1 ? "minute" : "minutes"} of study time!
        </p>
        <p>You have completed {this.props.tasks} tasks!</p>
        <div>
          <Link to={"/library"}>Back to Library!</Link>
        </div>
      </div>
    );
  }
}
