import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import alarm from "../timer-alarm.mp3";
import Taskbar from "./timer-taskbar-component.js";

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      studytime: 0,
      breaktime: 0,
      time: {},
      minutes: 0,
      seconds: 0,
      minutesInString: "",
      secondsInString: "00",
      studyNow: true,
      totalElaspedStudyTime: 0
    };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.numberToString = this.numberToString.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/library/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          studytime: response.data.studytime,
          breaktime: response.data.breaktime,
          minutes: response.data.studytime,
          minutesInString: this.numberToString(response.data.studytime)
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  numberToString(val) {
    const s = "" + val;
    if (val < 10) {
      return "0" + s;
    } else {
      return s;
    }
  }

  startTimer() {
    if (this.state.minutes === 0 && this.state.seconds === 0) {
    } else {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  pauseTimer() {
    clearInterval(this.timer);
  }

  resetTimer() {
    clearInterval(this.timer);
    this.setState({
      minutes: this.state.studytime,
      seconds: 0,
      minutesInString: this.numberToString(this.state.studytime),
      secondsInString: this.numberToString(0)
    });
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    if (this.state.seconds > 0) {
      const newSeconds = this.state.seconds - 1;
      this.setState({
        seconds: newSeconds,
        secondsInString: this.numberToString(newSeconds),
        totalElaspedStudyTime: this.state.totalElaspedStudyTime + 1
      });
    } else if (this.state.seconds === 0 && this.state.minutes > 0) {
      const newMinutes = this.state.minutes - 1;
      this.setState({
        minutes: newMinutes,
        seconds: 59,
        minutesInString: this.numberToString(newMinutes),
        secondsInString: this.numberToString(59),
        totalElaspedStudyTime: this.state.totalElaspedStudyTime + 1
      });
    } else {
      //need to swap between study time and break time
      clearInterval(this.timer);
      new Audio(alarm).play();
      if (this.state.studyNow) {
        this.setState({
          totalElaspedStudyTime: this.state.totalElaspedStudyTime + 1,
          minutes: this.state.breaktime,
          seconds: 0,
          minutesInString: this.numberToString(this.state.breaktime),
          secondsInString: this.numberToString(0),
          studyNow: false
        });
      } else {
        this.setState({
          totalElaspedStudyTime: this.state.totalElaspedStudyTime + 1,
          minutes: this.state.studytime,
          seconds: 0,
          minutesInString: this.numberToString(this.state.studytime),
          secondsInString: this.numberToString(0),
          studyNow: true
        });
      }
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <small>{this.state.studyNow ? "Time To Study!" : "Break Time"}</small>
        <div>
          <p>
            {this.state.minutesInString} : {this.state.secondsInString}
          </p>
        </div>
        <div>
          <button onClick={this.startTimer}>Start</button>
          <button onClick={this.pauseTimer}>Pause</button>
          <button onClick={this.resetTimer}>Reset</button>
        </div>
        <div>
          <Taskbar />
        </div>
        <div>
          <Link to={"/summary"}>Log Study Session!</Link>
        </div>
      </div>
    );
  }
}
