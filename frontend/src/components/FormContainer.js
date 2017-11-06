import React, {Component} from 'react';
import TextArea from '../components/TextArea';
import PropTypes from 'prop-types';
import {URL, ISSUE} from "../config/Api";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import store from '../store';
import Center from 'react-center';
import axios from 'axios';
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

            <div className="container" frameBorder="3px black">
                <br />
                <Center/>


                <Center>
                    <div className="table">
                        <table align="center">
                            <tr><td colSpan="2"><h3> Create New Issue</h3></td></tr>
                            <tr>
                                <td> <p>Enter Issue Title</p> </td>

                                <td >
                            <TextArea
                                inputType={'text'}
                                name={'title'}
                                controlFunc={this.handleTitleChange}
                                content={this.state.issueTitle}
                                placeholder={'Enter Issue Title'} />
                                </td>
                            </tr>
                            <tr>
                                <td> <p> Enter Issue Description</p> </td>
                                <td>
                    <TextArea
                        inputType={'text'}
                        name={'description'}
                        controlFunc={this.handleDescriptionChange}
                        content={this.state.description}
                        placeholder={'Enter Description of Issue'} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2"><button
                                    className="btn btn-link"
                                    onClick={this.handleFormSubmit}>Submit
                                </button></td>
                            </tr>
                        </table>
                    </div>
                </Center>
                <br />

            </div>

        );
    }
}
FormContainer.propTypes = {
    position: PropTypes.object,
}
export default FormContainer;