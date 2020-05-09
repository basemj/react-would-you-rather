/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { handleSaveQuestion } from '../actions/sharedHandlers';

class NewQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionOneText: '',
      optionTwoText: '',
      showError: false,
      loading: false,
    };
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleFormsubmit = event => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { optionOneText, optionTwoText } = this.state;
    if (optionOneText && optionTwoText) {
      this.setState({ loading: true });
      dispatch(handleSaveQuestion(optionOneText, optionTwoText)).then(() => {
        const { history } = this.props;
        history.push('/');
      });
    } else {
      this.setState({ showError: true });
    }
  };

  render() {
    const { optionOneText, optionTwoText, showError, loading } = this.state;

    return (
      <div>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1>Add new poll question</h1>
            <p>Would you rather...</p>
            <Form onSubmit={this.handleFormsubmit}>
              <Form.Group controlId="optionOneText">
                <Form.Label>Option A</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter option A text"
                  value={optionOneText}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="optionTwoText">
                <Form.Label>Option B</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter option B text"
                  value={optionTwoText}
                  onChange={this.handleChange}
                />
              </Form.Group>

              {showError && <p>Both fields must be completed</p>}
              <Button variant="primary" type="submit" disabled={loading}>
                Add question
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

NewQuestionForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(withRouter(NewQuestionForm));
