import React, { Component } from 'react';
import Vote from './Vote';
import PropTypes from 'prop-types';
import { URL, COMMENT } from "../config/Api";
import store from '../store';
import axios from 'axios';
import { Header, Grid, Form, Button, Container } from 'semantic-ui-react'
import CommentArea from './CommentArea'

class IssueContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueTitle: this.props.title,
            description: this.props.description,
            id: this.props.id,
            comment: '',
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            issueTitle: nextProps.title,
            description: nextProps.description,
            id: nextProps.id
        })

    }

    handleFormSubmit() {
        return axios
            .post(URL + COMMENT + '/', {
                body: this.state.comment,
                issue: this.state.id,
            },
            {
                headers: { 'Authorization': 'Token ' + store.getState().token }
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    handleClearForm() {
        // clear form logic goes here
    }

    handleCommentChange(e) {
        this.setState({ comment: e.target.value });
    }

    render() {
        return (
            <Container>
                <Grid divided='vertically' relaxed>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Header content={this.state.issueTitle} subheader={this.state.description} size='large' />
                        </Grid.Column>
                        <Grid.Column>
                            <Vote issue_id={this.state.id} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <CommentArea issue_id={this.state.id} />
                            <Header as='h3' dividing>Submit New Comment</Header>
                            <Form reply>
                                <Form.TextArea onChange={this.handleCommentChange} />
                                <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={this.handleFormSubmit} />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Container>

        );
    }
}
IssueContainer.propTypes = {
    title: PropTypes.object,
    description: PropTypes.object,
}
export default IssueContainer;