import { _getQuestions } from '../utils/_DATA';

const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
const SAVE_QUESTION_ANSWERS = 'SAVE_QUESTION_ANSWERS';
const SAVE_QUESTION = 'SAVE_QUESTION';

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

const saveQuestion = (question) => {
  return {
    type: SAVE_QUESTION,
    question
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
  SAVE_QUESTION,
  saveQuestionAnswers,
  saveQuestion,
  handleReceiveQuestions,
};
