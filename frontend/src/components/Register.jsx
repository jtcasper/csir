import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
import '../style/App.css';
import { URL, REGISTER } from '../config/Api';
import { Container } from 'semantic-ui-react'


class Register extends Component {
    handleClick(event){
        console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.user_name,this.state.password);
        //To be done:check for empty values before hitting submit
        var self = this;

        var first_name = this.state.first_name
        var last_name = this.state.last_name
        var email = this.state.email
        var username = this.state.user_name
        var password = this.state.password
        var official = false

        return axios
            .post(URL + REGISTER, {
                first_name,
                last_name,
                email,
                username,
                password,
                official
            })
            .then(function (response) {
                console.log(response);
                if(response.data.code === 200){
                    //  console.log("registration successfull");
                    var loginscreen=[];
                    loginscreen.push(<Login parentContext={this}/>);
                    var loginmessage = "Not Registered yet.Go to registration";
                    self.props.parentContext.setState({loginscreen:loginscreen,
                        loginmessage:loginmessage,
                        buttonLabel:"Register",
                        isLogin:true
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    constructor(props){
        super(props);
        this.state={
            first_name:'',
            last_name:'',
            user_name:'',
            email:'',
            password:''
        }
    }
    render() {
        return (
            <div>
                <Container>
                <MuiThemeProvider>
                    <div className="form">

                        <TextField
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange = {(event,newValue) => this.setState({first_name:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange = {(event,newValue) => this.setState({last_name:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange = {(event,newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your User Name"
                            floatingLabelText="User Name"
                            onChange = {(event,newValue) => this.setState({user_name:newValue})}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
                </Container>
            </div>
        );
    }
}
const style = {
    margin: 15,
};

export default Register;