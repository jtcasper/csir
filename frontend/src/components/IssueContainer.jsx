import React, { Component } from 'react';
import Vote from './Vote';
import PropTypes from 'prop-types';
import { URL, COMMENT } from "../config/Api";
import store from '../store';
import axios from 'axios';
import { Header, Grid, Form, Button, Container, Message } from 'semantic-ui-react'
import CommentArea from './CommentArea'

class IssueContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueTitle: this.props.title,
            description: this.props.description,
            id: this.props.id,
            comment: '',
            message: null
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
        var self = this;
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
                if(response.status == 201){
                    self.setState({
                        message: <Message positive header='Thank you!' content='Comment has been added successfully' /> //Add success message
                    });
                }
            })
            .catch(function (error) {
                self.setState({message: <Message negative header='Failed to add comment' content='Please try again' />});
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
                <Header content='View Issue' size='large' dividing />
                <Grid divided='vertically'>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Header content={this.state.issueTitle} subheader={this.state.description} size='medium' />
                        </Grid.Column>
                        <Grid.Column>
                            <Vote issue_id={this.state.id} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <CommentArea issue_id={this.state.id} />
                            <Header content='Submit New Comment' size='medium' />
                            <Form reply>
                                <Form.TextArea onChange={this.handleCommentChange}/>
                                <Button content='Add Comment' labelPosition='left' icon='edit' primary onClick={this.handleFormSubmit} />
                                {this.state.message}
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>

        );
    }
}
IssueContainer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}
export default IssueContainer;