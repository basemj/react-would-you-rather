/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from "prop-types";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { handleSaveQuestion } from "../actions/sharedHandlers";

class NewQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionOneText: '',
      optionTwoText: '',
      showError: false,
    };
  }

  handleChange = event => {
    const {id, value} = event.target;
    this.setState({[id]: value});
  }

  handleFormsubmit = event => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { optionOneText, optionTwoText } = this.state;
    if(optionOneText && optionTwoText) {
      dispatch(handleSaveQuestion(optionOneText, optionTwoText))
        .then(() => {
          const {history} = this.props;
          history.push('/');
        });
    } else {
      this.setState({showError: true});
    }
  }

  render() {
    const {optionOneText, optionTwoText, showError} = this.state;

    return (
      <div>
        <h1>Add new poll question</h1>
        <p>Would you rather...</p>
        <form onSubmit={this.handleFormsubmit}>
          <label htmlFor="optionOneText">Option A</label>
          <input
            id="optionOneText"
            type="text"
            placeholder="Option A"
            value={optionOneText}
            onChange={this.handleChange}
          />

          <label htmlFor="optionTwoText">Option B</label>
          <input
            id="optionTwoText"
            type="text"
            placeholder="option B"
            value={optionTwoText}
            onChange={this.handleChange}
          />

          {showError && <p>Both fields must be completed</p>}
          <input type="submit" />
        </form>
      </div>
    );
  }
};

NewQuestionForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default connect()(withRouter(NewQuestionForm));
