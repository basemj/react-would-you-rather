import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import QuestionDetails from '../components/QuestionDetails';

const Question = props => {
  const { match } = props;
  const { id } = match.params;
  return (
    <div>
      <QuestionDetails questionId={id} />
    </div>
  );
};

Question.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default withRouter(Question);
