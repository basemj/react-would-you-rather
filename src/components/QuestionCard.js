import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const QuestionCard = props => {
  const { question, user } = props;

  if (!user.id) {
    return (
      <div>
        Cannot find question. Return to
        <Link to="/">Home</Link>
      </div>
    );
  }

  return (
    <div>
      <img src={`/assets/${user.avatarURL}`} alt="" />
      {user.name}
      asks would you rather
      {question.optionOne && question.optionOne.text}
      <span>or ...</span>
      <Link to={`questions/${question.id}`}>{question.id}</Link>
    </div>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    optionOne: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }),
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
    avatarURL: PropTypes.string,
    id: PropTypes.string,
  }),
};

QuestionCard.defaultProps = {
  question: {},
  user: {},
};

const mapStateToProps = ({ users }, ownProps) => {
  const { question } = ownProps;
  const user = question && users && users[question.author];
  return {
    user,
  };
};

export default connect(mapStateToProps)(QuestionCard);
