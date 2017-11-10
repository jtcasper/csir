import React, { Component } from 'react';
import TextArea from '../components/TextArea';
import Vote from './Vote';
import PropTypes from 'prop-types';
import { URL, COMMENT } from "../config/Api";
import store from '../store';
import axios from 'axios';
import { Container, Header, Grid } from 'semantic-ui-react'


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
                issue: this.state.issueTitle,
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
                <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Header content={this.state.issueTitle} subheader={this.state.description} size='large' />
                        </Grid.Column>
                        <Grid.Column>
                            <Vote issue_id={this.state.id} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div className="table">
                    <table align="center">
                        <tr><td colSpan="2"><h3> {this.state.issueTitle} </h3></td></tr>
                        <tr>
                            <td> <p>{this.state.description}</p> </td>
                        </tr>
                    </table>
                </div>
                <div className="table">
                    <table align="center">
                        <tr><td colSpan="2"><h3> {'Submit New Comment'} </h3></td></tr>
                        <tr>
                            <td>
                                <TextArea
                                    inputType={'text'}
                                    name={'description'}
                                    controlFunc={this.handleCommentChange}
                                    content={this.state.comment}
                                    placeholder={'Enter Comment'} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button
                                className="btn btn-link"
                                onClick={this.handleFormSubmit}>Reply
                                </button></td>
                        </tr>
                    </table>
                </div>
            </Container>

        );
    }
}
IssueContainer.propTypes = {
    title: PropTypes.object,
    description: PropTypes.object,
}
export default IssueContainer;