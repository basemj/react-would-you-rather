import { _getQuestions } from '../utils/_DATA';

const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

const receiveQuestions = questions => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

const handleReceiveQuestions = () => {
  return dispatch => {
    return _getQuestions().then(questions => dispatch(receiveQuestions(questions)));
  };
};

export { RECEIVE_QUESTIONS, handleReceiveQuestions };
