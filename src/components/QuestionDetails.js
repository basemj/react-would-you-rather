import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleSaveQuestionAnswer } from "../actions/sharedHandlers";

const QuestionDetails = props => {
  const {
    authedUser,
    question,
    author,
    isAnswered,
    answeredOption,
    optionOneCount,
    optionOnePercentage,
    optionTwoCount,
    optionTwoPercentage,
    dispatch,
  } = props;

  if (!question.id) {
    return (
      <div>
        Cannot find question. Return to
        <Link to="/">Home</Link>
      </div>
    );
  }

  const submitAnswer = (answer) => {
    dispatch(handleSaveQuestionAnswer(authedUser, question.id, answer));
  };

  return (
    <div>
      <img src={`/assets/${author.avatarURL}`} alt="" />
      <span>
        {author.name}
      </span>
      asks...

      <p>would you rather...</p>
      <p>
        a.
        {question.optionOne.text}
        {optionOnePercentage}
        %
        {optionOneCount}
      </p>
      {
        isAnswered ?
          <span>A</span> :
          <input type="button" value="A" onClick={() => submitAnswer('optionOne')} />
      }

      <p>
        b.
        {question.optionTwo.text}
        {optionTwoPercentage}
        %
        {optionTwoCount}
      </p>
      {
        isAnswered ?
          <span>B</span> :
          <input type="button" value="B" onClick={() => submitAnswer('optionTwo')} />
      }

      { isAnswered && (
        <p>
          you answered
          {'I would rather '}
          {question[answeredOption].text}
        </p>
      )}
    </div>
  );
};

QuestionDetails.propTypes = {
  authedUser: PropTypes.string.isRequired,
  answeredOption: PropTypes.string,
  author: PropTypes.shape({
    id: PropTypes.string,
    avatarURL: PropTypes.string,
    name: PropTypes.string,
  }),
  isAnswered: PropTypes.bool,
  optionOneCount: PropTypes.number,
  optionOnePercentage: PropTypes.number,
  optionTwoCount: PropTypes.number,
  optionTwoPercentage: PropTypes.number,
  question: PropTypes.shape({
    id: PropTypes.string,
    optionOne: PropTypes.object,
    optionTwo: PropTypes.object,
  }),
  dispatch: PropTypes.func.isRequired,
};

QuestionDetails.defaultProps = {
  answeredOption: '',
  optionOneCount: 0,
  optionOnePercentage: 0,
  optionTwoCount: 0,
  optionTwoPercentage: 0,
  author: {},
  isAnswered: false,
  question: {},
};

const mapStateToProps = ({ authedUser, users, questions }, ownProps) => {
  const { questionId } = ownProps;
  const question = questions[questionId];
  const author = question && users[question.author];
  const isAnswered = question &&
  [
    ...question.optionOne.votes,
    ...question.optionTwo.votes
  ].includes(authedUser);

  const optionOneCount = question && question.optionOne.votes.length;
  const optionTwoCount = question && question.optionTwo.votes.length;

  const optionOnePercentage = optionOneCount ?
    100 / (optionOneCount + optionTwoCount) * optionOneCount : 0;

  const optionTwoPercentage = optionTwoCount ?
    100 / (optionOneCount + optionTwoCount) * optionTwoCount : 0;

  const answeredOption = isAnswered &&
    question.optionOne.votes.includes(authedUser) ? 'optionOne' : 'optionTwo';

  return {
    authedUser,
    question,
    author,
    isAnswered,
    answeredOption,
    optionOneCount,
    optionOnePercentage,
    optionTwoCount,
    optionTwoPercentage,
  };
};

export default connect(mapStateToProps)(QuestionDetails);
