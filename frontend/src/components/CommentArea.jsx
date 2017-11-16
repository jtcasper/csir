import React, { Component } from 'react';
import { URL, ISSUE } from '../config/Api';
import axios from 'axios';
import { Comment } from 'semantic-ui-react'
import avatar from '../avatar.png'

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
                <Comment.Group>
                    {localComments.map((comment, i) => {
                        return (
                            
                                <Comment key={i}>
                                    <Comment.Avatar src={avatar} />
                                    <Comment.Content>
                                        <Comment.Author as='a'>{comment.author_raw}</Comment.Author>
                                        <Comment.Text>{comment.body}</Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            
                        )
                    })}
                </ Comment.Group>
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