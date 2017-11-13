import React, {Component} from 'react';
import TextArea from '../components/TextArea';
import PropTypes from 'prop-types';
import {URL, ISSUE} from "../config/Api";
import store from '../store';
import Center from 'react-center';
import axios from 'axios';
import { Header, Grid, Form, Button, Container } from 'semantic-ui-react'
import '../style/App.css';

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueTitle: '',
            description: '',
            lat: this.props.position.lat,
            lng: this.props.position.lng
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
            this.setState({lat: this.props.position.lat});
            this.setState({lng: this.props.position.lng});
        }
    }

    handleFormSubmit() {
        var title = this.state.issueTitle
        var description = this.state.description
        var lat = this.state.lat
        var lng = this.state.lng
        return axios
            .post(URL + ISSUE + '/', {
                    name: title,
                    desc: description,
                    lat: lat,
                    lng: lng
                },
                {
                    headers: {'Authorization': 'Token ' + store.getState().token}
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
        return (

          <div className="container">
                        <Form add>
                            <Header as='h3' dividing>Issue Title</Header>
                            <Form.TextArea onChange={this.handleTitleChange} />

                            <Header as='h3' dividing>Issue Description</Header>
                            <Form.TextArea onChange={this.handleDescriptionChange} />

                            <Button content='Add Issue' labelPosition='left' icon='add' primary onClick={this.handleFormSubmit} />
                        </Form>
                    </div>



        );
    }
}
FormContainer.propTypes = {
    position: PropTypes.object,
}
export default FormContainer;