import React, { Component } from 'react';
import { URL, ISSUE } from '../config/Api';
import axios from 'axios';

class CommentArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        }
    }

    componentDidMount() {
        axios
            .get(URL + ISSUE + '/' + this.props.issue_id + '/comments/', {

            })
            .then((response) => {
                this.setState({ comments: response.data })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    componentWillReceiveProps(nextProps) {
        axios
          .get(URL + ISSUE + '/' + nextProps.issue_id + '/comments/')
          .then((response) => {
            this.setState({ comments: response.data })
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    

    render() {

        let localComments = null;
        if (this.state.comments !== []) {
            localComments = this.state.comments;
            //TODO: Maybe turn this into a Comment component?
            return (
                <div>
                    {localComments.map((comment, i) => {
                        return (
                            <div>
                                <p>{comment.author_raw}</p>
                                <p>{comment.body}</p>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                //No comments
                <div></div>
            )
        }
    }
}

export default CommentArea;