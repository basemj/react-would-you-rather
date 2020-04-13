import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleReceiveQuestions } from '../actions/questions';
import QuestionCard from './QuestionCard';

class QuestionsList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleReceiveQuestions());
  }

  render() {
    const { filteredQuestions } = this.props;
    return (
      <ul>
        {filteredQuestions.map(question => (
          <li key={question.id}>
            <QuestionCard question={question} />
          </li>
        ))}
      </ul>
    );
  }
}

QuestionsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  filteredQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ authedUser, questions, users }, ownProps) => {
  const questionsArray = Object.keys(questions).map(question => questions[question]);
  const authedUserObject = users[authedUser];
  const authedUserAnswers = authedUserObject && Object.keys(authedUserObject.answers);

  const filteredQuestions = questionsArray
    .filter(question => {
      const authedUserHasAnsweredQuestion =
        authedUserAnswers && authedUserAnswers.includes(question.id);
      return ownProps.type === 'answered'
        ? authedUserHasAnsweredQuestion
        : !authedUserHasAnsweredQuestion;
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    filteredQuestions,
  };
};

export default connect(mapStateToProps)(QuestionsList);
