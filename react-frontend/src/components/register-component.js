import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class Authentication extends Component {

    constructor(props) {
        
        super(props);
    
        this.state = {
            username: "",
            email: "",
            password: ""
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
    
        const newUser = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
          
        };
    
        console.log(newUser);
    
        axios
          .post("https://orbital-eleven-backend.herokuapp.com/users/add", newUser)
          .then((res) => alert("user added!"))
          .catch(err => alert("duplicate details"));
        this.props.history.push("/login");

      }



    render(){

        return(
            <div>
                <h3>Sign Up Page</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    />
                </div>
                <div className="form-group">
                    <input
                    type="submit"
                    value="Create User"
                    className="btn btn-primary"
                    />
                </div>
                </form>
            </div>
        );

    }


}