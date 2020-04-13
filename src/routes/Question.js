import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';

const Question = props => {
  const { match } = props;
  const { id } = match.params;
  return (
    <div>
      <QuestionCard id={id} />
    </div>
  );
};

Question.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default withRouter(Question);
