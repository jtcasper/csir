import React from 'react';
import { Motion, spring } from 'react-motion';
import { URL, ISSUE, VOTE } from "../config/Api";
import axios from 'axios';
import store from '../store';


const { Component, Children, PropTypes } = React

const Arrow = ({ direction, ...props }) => (
  <svg viewBox="0 0 28 12" {...props}>
    <polyline
      points={
        direction === 'up' ?
          "0.595,11.211 14.04,1.245 27.485,11.211" :
          "27.485,0.803 14.04,10.769 0.595,0.803"
      }
    />
  </svg>
)

Arrow.defaultProps = {
  direction: 'up'
}

class NumberColumn extends Component {
  _getNumbers() {
    let numbers = []
    let i = 0

    while (i < 10) {
      numbers.push(<div>{i}</div>)
      i++
    }

    return numbers
  }

  render() {
    const { current } = this.props

    return (
      <div className="vote__column">
        <Motion
          style={{ y: spring(current * 10) }}
        >
          {({ y }) =>
            <div
              style={{
                transform: `translateY(${-y}%)`
              }}
            >
              {this._getNumbers()}
            </div>
          }
        </Motion>
      </div>
    )
  }
}

class Vote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      importance: 0,
      vote: 0
    }
  }

  componentDidMount() {
    axios
      .get(URL + ISSUE + '/' + this.props.issue_id + '/')
      .then((response) => {
        this.setState({ importance: response.data.importance })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  _getCount() {
    const counts = this.state.importance.toString().split('')

    return counts.map(_count => {
      if (_count === '-') {
        return <span className="vote__column">-</span>
      } else {
        return <NumberColumn current={parseFloat(_count)} />
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    axios
      .get(URL + ISSUE + '/' + nextProps.issue_id + '/')
      .then((response) => {
        this.setState({ importance: response.data.importance })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.vote != this.state.vote){
      axios
      .get(URL + ISSUE + '/' + this.props.issue_id + '/')
      .then((response) => {
        this.setState({ importance: response.data.importance }, this.forceUpdate())
      })
      .catch(function (error) {
        console.log(error)
      });
    }
  }

  vote(val) {
    axios
      .post(URL + VOTE + '/', {
        issue: this.props.issue_id,
        vote: val
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
    const { importance } = this.state

    return (
      <div className="vote" ref="myRef">
        <Arrow
          direction="up"
          className="vote__arrow vote__arrow--up"
          onClick={() => this.vote(1)}
        />
        <div className="vote__columns">
          {this._getCount()}
        </div>
        <Arrow
          direction="down"
          className="vote__arrow vote__arrow--down"
          onClick={() => this.vote(-1)}
        />
      </div>
    )
  }
}

export default Vote;