import { _getQuestions } from '../utils/_DATA';

const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
const SAVE_QUESTION_ANSWERS = 'SAVE_QUESTION_ANSWERS';

const receiveQuestions = questions => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

const saveQuestionAnswers = (authedUser, qid, answer) => {
  return {
    type: SAVE_QUESTION_ANSWERS,
    authedUser,
    qid,
    answer
  };
};

const handleReceiveQuestions = () => {
  return dispatch => {
    return _getQuestions().then(questions => dispatch(receiveQuestions(questions)));
  };
};

export {
  RECEIVE_QUESTIONS,
  SAVE_QUESTION_ANSWERS,
  saveQuestionAnswers,
  handleReceiveQuestions
};
