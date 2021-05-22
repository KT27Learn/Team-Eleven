/*import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class TimerCount extends Component {

    constructor(props) {
        super(props);

        this.startTime = this.startTime.bind(this);
        this.pauseTime = this.pauseTime.bind(this);

        this.state = {

            name:'',
            studytime: 0,
            breaktime: 0,
            studytime: true
            
        }
    }

    componentDidMount() {
        //react always run this code when mounting the component
        axios.get('http://localhost:5000/library/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.username,
                    studytime: response.data.studytime,
                    breaktime: response.data.breaktime,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        let interval = setInterval(() => {
          clearInterval(interval);
    
          if (seconds === 0) {
            if (minutes !== 0) {
              setSeconds(59);
              setMinutes(minutes - 1);
            } else {
              let minutes = displayMessage ? 24 : 4;
              let seconds = 59;
    
              setSeconds(seconds);
              setMinutes(minutes);
              setDisplayMessage(!displayMessage);
            }
          } else {
            setSeconds(seconds - 1);
          }
        }, 1000);
      }, [seconds]);
    
      const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    render() {
      return (
        <div>
            <h1>{this.name}</h1>
            <p>{`${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
            <Link to="/"><button>
              Finish  
            </button>
        </div>

      );
    }
}*/