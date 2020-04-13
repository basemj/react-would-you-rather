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
    const { questions } = this.props;
    return (
      <ul>
        {questions.map(question => (
          <li key={question}>
            <QuestionCard id={question} />
          </li>
        ))}
      </ul>
    );
  }
}

QuestionsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ authedUser, questions, users }, ownProps) => {
  const questionsArray = Object.keys(questions);
  const authedUserObject = users[authedUser];
  const authedUserAnswers = authedUserObject && Object.keys(authedUserObject.answers);

  const filteredQuestions = questionsArray.filter(question => {
    const authedUserHasAnsweredQuestion = authedUserAnswers && authedUserAnswers.includes(question);
    return ownProps.type === 'answered'
      ? authedUserHasAnsweredQuestion
      : !authedUserHasAnsweredQuestion;
  });

  return {
    questions: filteredQuestions,
  };
};

export default connect(mapStateToProps)(QuestionsList);
