import React, {Component} from 'react';
import TextArea from '../components/TextArea';
import PropTypes from 'prop-types';
import {URL, COMMENT} from "../config/Api";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import store from '../store';
import Center from 'react-center';
import axios from 'axios';
import '../style/App.css';

class IssueContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueTitle: this.props.title,
            description: this.props.description,
            comment: '',
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);

    }

    handleFormSubmit() {
        var title = this.state.issueTitle
        var description = this.state.description
        var lat = this.state.lat
        var lng = this.state.lng
        return axios
            .post(URL + COMMENT + '/', {
                    body: this.state.comment,
                    issue: this.state.issueTitle,
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

    handleCommentChange(e) {
        this.setState({ comment: e.target.value });
    }
    render() {
        return (

            <div className="container">
                <br />
                <Center/>
                <Center>
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
                </Center>
                <br />

            </div>

        );
    }
}
IssueContainer.propTypes = {
    title: PropTypes.object,
    description: PropTypes.object,
}
export default IssueContainer;