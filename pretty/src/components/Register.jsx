import React from 'react'
import { Form, Container } from 'semantic-ui-react'

export default class Register extends React.Component {

  state = {}

  handleSubmit = () => {
    const { fname, lname, username, password, email, official } = this.state

    this.setState({
      fname: fname,
      lname: lname,
      username: username,
      password: password,
      email: email,
      official: official
    })
  }

  render() {

    const { fname, lname, username, password, email, official } = this.state

    return (
      <div>
        <Container text>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input placeholder='First Name' label='Enter First Name' value={fname} />
              <Form.Input placeholder='Last Name' label='Enter Last Name' value={lname} />
            </ Form.Group>
            <Form.Input placeholder='Username' label='Enter Username' value={username} />
            <Form.Input placeholder='Password' label='Enter Password' type='password' value={password} />
            <Form.Input placeholder='Email' label='Enter Email' value={email} />
            <Container textAlign='center'>
              <Form.Button content='Submit' />
            </Container>
          </Form>
        </Container>
      </div>
    );
  }
}