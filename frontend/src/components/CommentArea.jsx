import React, { Component } from 'react';
import { URL, ISSUE, USER } from '../config/Api';
import axios from 'axios';
import { Comment, Icon } from 'semantic-ui-react'
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
            .get(URL + ISSUE + '/' + this.props.issue_id + '/comments/')
            .then((response) => {
                response.data.map((res) => {
                    axios
                        .get(res.author)
                        .then((response) => {
                            res.official = response.data.official;
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                    this.setState({ comments: this.state.comments.concat(res) })
                });
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    componentWillReceiveProps(nextProps) {
        axios
        .get(URL + ISSUE + '/' + nextProps.issue_id + '/comments/')
        .then((response) => {
            response.data.map((res) => {
                axios
                    .get(res.author)
                    .then((response) => {
                        res.official = response.data.official;
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                this.setState({ comments: this.state.comments.concat(res) })
            });
        })
        .catch(function (error) {
            console.log(error)
        })

    }


    render() {
        //TODO: Maybe turn this into a Comment component?
        console.log(this.state.comments);
        return (
            <Comment.Group>
                {this.state.comments.map((comment, i) => {

                    return (
                        <Comment key={i}>
                            <Comment.Avatar src={avatar} />
                            <Comment.Content>
                                <Comment.Author>{comment.author_raw}</Comment.Author>
                                <Comment.Text>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    )

                }
                )}
            </ Comment.Group>
        )

    }
}

export default CommentArea;