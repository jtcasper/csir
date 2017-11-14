import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { URL, ISSUE } from "../config/Api";
import store from '../store';
import axios from 'axios';
import { Header, Form, Button, Message } from 'semantic-ui-react'
import '../style/App.css';

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueTitle: '',
            description: '',
            lat: this.props.position.lat,
            lng: this.props.position.lng,
            status: 'new'   //Enum for new issue status, one of 'new', 'created' or 'failed'
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleLatChange = this.handleLatChange.bind(this);
        this.handleLngChange = this.handleLngChange.bind(this);
    }

    componentDidUpdate() {
        if (this.state.lng !== this.props.position.lng || this.state.lat !== this.props.position.lat) {
            this.setState({ lat: this.props.position.lat });
            this.setState({ lng: this.props.position.lng });
        }
    }

    handleFormSubmit() {
        var title = this.state.issueTitle
        var description = this.state.description
        var lat = this.state.lat
        var lng = this.state.lng
        var self = this;
        return axios
            .post(URL + ISSUE + '/', {
                name: title,
                desc: description,
                lat: lat,
                lng: lng
            },
            {
                headers: { 'Authorization': 'Token ' + store.getState().token }
            })
            .then(function (response) {
                console.log(response);
                if (response.status == 201) {
                    self.setState({ status: 'created' });
                }
            })
            .catch(function (error) {
                console.log(error);
                self.setState({ status: 'failed' });
            });
    }

    handleClearForm() {
        // clear form logic goes here
    }

    handleTitleChange(e) {
        this.setState({ issueTitle: e.target.value });
    }

    handleLatChange(e) {
        this.setState({ lat: e.target.value });
    }

    handleLngChange(e) {
        this.setState({ lng: e.target.value });
    }

    handleDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }
    render() {
        if (this.state.status === 'created') {
            return (
                <div className="container">
                    <Message positive>
                        <Message.Header>Thank you!</Message.Header>
                        <p><b>{this.state.issueTitle} has been added</b></p>
                    </Message>
                </div>
            );
        } else if (this.state.status === 'failed') {
            return (
                <div className="container">
                    <Message negative>
                        <Message.Header>Unable to add issue</Message.Header>
                        <p>Please make sure that you have added a title and description</p>
                    </Message>
                </div>
            );
        } else { // Still creating issue
            return (
                <div className="container">
                    <Form add>

                        <Form.Field>
                            <label>Issue Title</label>
                            <input placeholder='Title' onChange={this.handleTitleChange} />
                        </Form.Field>

                        <Form.Field>
                            <label>Issue Description</label>
                            <input placeholder='Description' onChange={this.handleDescriptionChange} />
                        </Form.Field>

                        <Button content='Add Issue' labelPosition='center' icon='add' primary onClick={this.handleFormSubmit} />
                    </Form>
                </div>
            );
        }
    }
}
FormContainer.propTypes = {
    position: PropTypes.object,
}
export default FormContainer;