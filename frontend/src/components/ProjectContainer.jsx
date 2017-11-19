import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { URL, COMMENT } from "../config/Api";
import store from '../store';
import axios from 'axios';
import { Header, Grid, Container, Message, Step, Icon } from 'semantic-ui-react'

class ProjectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueTitle: this.props.title,
      status: this.props.status,
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      issueTitle: nextProps.title,
      status: nextProps.status,
    })

  }

  render() {
    return (
      <Container>
        <Header content='View Project' size='large' dividing />
        <Grid divided='vertically'>
          <Grid.Row>
            <Grid.Column>
              <Header content={this.state.issueTitle} size='medium' />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Step.Group fluid>

              <Step active={this.state.status === 'Design'}>
                <Icon name='pencil' />
                <Step.Content>
                  <Step.Title>In Design</Step.Title>
                </Step.Content>
              </Step>

              <Step active={this.state.status === 'Partially funded'}>
                <Icon name='idea' />
                <Step.Content>
                  <Step.Title>Needs Funding</Step.Title>
                </Step.Content>
              </Step>

              <Step active={this.state.status === 'Funded'}>
                <Icon name='money' />
                <Step.Content>
                  <Step.Title>Funded</Step.Title>
                </Step.Content>
              </Step>

              <Step active={this.state.status === 'Construction'}>
                <Icon name='truck' />
                <Step.Content>
                  <Step.Title>Under Construction</Step.Title>
                </Step.Content>
              </Step>

            </Step.Group>
          </Grid.Row>
        </Grid>
      </Container>

    );
  }
}
ProjectContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}
export default ProjectContainer;