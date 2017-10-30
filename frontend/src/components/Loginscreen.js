import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import Register from './Register';
import { loggedin } from '../util/Auth';
class Loginscreen extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            loginmessage:'Not registered yet, Register Now',
            buttonLabel:'Register',
            isLogin:true
        }
        this.handleClick = this.handleClick.bind(this)
    }
    render() {
        let layout = null
        if (this.state.isLogin) {
            layout = <Login />
        } else {
            layout = <Register />
        }
        if (loggedin()) {
            return null
        }
        return (
            <div className="Layout">
                { layout }
                <div>
                    {this.state.loginmessage}
                    <MuiThemeProvider>
                        <div>
                            <RaisedButton label={this.state.buttonLabel} primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }

    handleClick(event){
        // console.log("event",event);
        // console.log(this.state.isLogin)
        let loginmessage;
        if(this.state.isLogin) {
            loginmessage = "Already registered.Go to Login";
            this.setState({
                loginmessage:loginmessage,
                buttonLabel:"Login",
                isLogin:false
            })
        } else {
            loginmessage = "Not Registered yet.Go to registration";
            this.setState({
                loginmessage:loginmessage,
                buttonLabel:"Register",
                isLogin:true
            })
        }
    }
}
const style = {
    margin: 15,
};

export default Loginscreen;