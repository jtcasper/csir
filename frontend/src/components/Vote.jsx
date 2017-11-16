import React, { Component } from 'react';
import { URL, ISSUE, VOTE } from "../config/Api";
import axios from 'axios';
import store from '../store';
import { Button } from 'semantic-ui-react';

class Vote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      importance: 0,
      vote: 0
    }
  }

  componentDidMount() {
    // Get the Issue Importance
    axios
      .get(URL + ISSUE + '/' + this.props.issue_id + '/')
      .then((response) => {
        this.setState({ importance: response.data.importance })
      })
      .catch(function (error) {
        console.log(error)
      });

    // Find out if I've Voted on this 
    axios
      .get(URL + ISSUE + '/' + this.props.issue_id + '/votes/')
      .then((response) => {
        response.data.map((obj, i) => {
          if (obj.author === store.getState().username) {
            this.setState({ vote: obj.vote });
          }
        });
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  componentWillReceiveProps(nextProps) {
    // Get the Issue Importance
    axios
      .get(URL + ISSUE + '/' + nextProps.issue_id + '/')
      .then((response) => {
        this.setState({ importance: response.data.importance })
      })
      .catch(function (error) {
        console.log(error)
      });

    // Find out if I've Voted on this 
    axios
      .get(URL + ISSUE + '/' + nextProps.issue_id + '/votes/')
      .then((response) => {
        response.data.map((obj, i) => {
          if (obj.author === store.getState().username) {
            this.setState({ vote: obj.vote });
          }
        });
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.vote !== this.state.vote) {
      axios
        .get(URL + ISSUE + '/' + this.props.issue_id + '/')
        .then((response) => {
          this.setState({ importance: response.data.importance }, this.forceUpdate())
        })
        .catch(function (error) {
          console.log(error)
        });

      // Find out if I've Voted on this 
      axios
        .get(URL + ISSUE + '/' + this.props.issue_id + '/votes/')
        .then((response) => {
          response.data.map((obj, i) => {
            if (obj.author === store.getState().username) {
              this.setState({ vote: obj.vote });
            }
          });
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  }

  vote(val) {
    var newVote = val == this.state.vote ? 0 : val;
    axios
      .post(URL + VOTE + '/', {
        issue: this.props.issue_id,
        vote: newVote
      },
      {
        headers: { 'Authorization': 'Token ' + store.getState().token }
      })
      .then((response) => {
        this.setState({ vote: response.data.vote })
      })
      .catch(function (error) {
        console.log(error);
      });
    return
  }

  render() {
    if(this.state.vote == 0){
      return (
        <Button.Group>
          <Button positive icon='thumbs outline up' onClick={() => this.vote(1)} />
          <Button disabled content={this.state.importance} />
          <Button negative icon='thumbs outline down' onClick={() => this.vote(-1)} />
        </ Button.Group>
      )
    } else if (this.state.vote == 1){
      return (
        <Button.Group>
          <Button positive icon='thumbs up' onClick={() => this.vote(1)} />
          <Button disabled content={this.state.importance} />
          <Button negative icon='thumbs outline down' onClick={() => this.vote(-1)} />
        </ Button.Group>
      )
    } else {
      return (
        <Button.Group>
          <Button positive icon='thumbs outline up' onClick={() => this.vote(1)} />
          <Button disabled content={this.state.importance} />
          <Button negative icon='thumbs down' onClick={() => this.vote(-1)} />
        </ Button.Group>
      )
    }
  }
}

export default Vote;