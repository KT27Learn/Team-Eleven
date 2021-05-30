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

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

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
          email: this.state.email,
          password: this.state.password
        };
    
        console.log(newUser);
    
        axios
          .post("https://team-eleven-backend.herokuapp.com/users/login", newUser)
          .then((response) => {

                const authUser = {
                    id: response.data._id,
                    username : response.data.username,
                    email : response.data.email
                }
                this.props.signIn(authUser);
            
           })    
          .catch(err => alert(err));

        if (this.props.user === null) {

            this.setState({
                email: "",
                password: ""
            })
            alert("Invalid Details! Try Again");

        } else {

            alert("Login Successfull");
            this.props.history.push("/");
        }

      }



    render(){

        return(
            <div>
                <h3>Login Page</h3>
                <form onSubmit={this.onSubmit}>
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
                    value="Log In"
                    className="btn btn-primary"
                    />
                </div>
                </form>
            </div>
        );

    }


}