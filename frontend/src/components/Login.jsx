import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { login } from '../util/Auth';
import '../style/App.css';
import { Container } from 'semantic-ui-react'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    render() {
        return (
            <div>
                <Container>
                    <MuiThemeProvider>
                        <div className="form">

                            <TextField
                                hintText="Enter your Username"
                                floatingLabelText="Username"
                                onChange={(event, newValue) => this.setState({ username: newValue })}
                            />
                            <br />
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({ password: newValue })}
                            />
                            <br />
                            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                        </div>
                    </MuiThemeProvider>
                </Container>
            </div>
        );
    }


    handleClick(event) {
        login(this.state.username, this.state.password)
    }
}
const style = {
    margin: 15,
};
export default Login;
