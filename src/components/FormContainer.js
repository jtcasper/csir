import React, {Component} from 'react';
import TextArea from '../components/TextArea';
import PropTypes from 'prop-types';
import {URL, ISSUE} from "../config/Api";
import store from '../store';
import axios from 'axios';

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
        if (this.state.lng != this.props.position.lng || this.state.lat != this.props.position.lat) {
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
            description: description,
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
                <h5>Create New Issue</h5>
                <TextArea
                    inputType={'text'}
                    title={'Issue Title'}
                    name={'title'}
                    controlFunc={this.handleTitleChange}
                    content={this.state.issueTitle}
                    placeholder={'Enter Issue Title'} />
                <TextArea
                    inputType={'text'}
                    title={'Issue Description'}
                    name={'description'}
                    controlFunc={this.handleDescriptionChange}
                    content={this.state.description}
                    placeholder={'Enter Description of Issue'} />
                {/* <TextArea
                    inputType={'text'}
                    title={'Latitude'}
                    name={'lat'}
                    controlFunc={this.handleLatChange}
                    content={this.state.lat}
                    placeholder={'Enter Issue Latitude'} />
                <TextArea
                    inputType={'text'}
                    title={'Longitude'}
                    name={'lng'}
                    controlFunc={this.handleLngChange}
                    content={this.state.lng}
                    placeholder={'Enter Issue Longitude'} /> */}

                <button
                    className="btn btn-link"
                    onClick={this.handleFormSubmit}>Submit
                </button>
            </div>
        );
    }
}
FormContainer.propTypes = {
    position: PropTypes.object,
}
export default FormContainer;