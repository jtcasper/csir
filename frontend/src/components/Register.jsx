import React, { Component } from 'react';
import '../style/App.css';
import { Button, Form, Grid, Header,Segment } from 'semantic-ui-react';
import { register } from '../util/Auth';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
            official: false,
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {
        return (
            <div className='login-form'>
                {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
                <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='black' textAlign='center'>
                            {''}Register
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    placeholder='First Name'
                                    name={'first_name'}
                                    value={this.state.first_name}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    placeholder='Last Name'
                                    name={'last_name'}
                                    value={this.state.last_name}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    placeholder='Email Address'
                                    name={'email'}
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    placeholder='Username'
                                    name={'username'}
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    placeholder='Password'
                                    type='password'
                                    name={'password'}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />

                                <Button color='black' fluid size='large' onClick={(event) => this.handleClick(event)}>Login</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }


    handleClick(event) {
        register(this.state.first_name, this.state.last_name, this.state.email, this.state.username, this.state.password, this.state.official);
    }
}
const style = {
    margin: 15,
};
export default Register;
