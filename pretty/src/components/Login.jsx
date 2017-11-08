import React from 'react'
import { Form, Container } from 'semantic-ui-react'

export default class Login extends React.Component {

  state = {}

  handleSubmit = () => {
    const { username, password } = this.state

    this.setState({ username: username, password: password })
  }

  render() {

    const { username, password } = this.state

    return (
      <div>
        <Container text>
          <Form>
            <Form.Input placeholder='Username' label='Enter Username' value={username} />
            <Form.Input placeholder='Password' label='Enter Password' type='password' value={password} />
            <Container textAlign='center'>
              <Form.Button content='Submit' />
            </Container>
          </Form>
        </Container>
      </div>
    );
  }
}