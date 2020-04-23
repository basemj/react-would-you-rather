import { RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWERS } from '../actions/questions';

const questions = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case SAVE_QUESTION_ANSWERS: {
      const {qid, answer, authedUser} = action;
      const updatedQuestions = {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser]),
          },
        },
      };

      return {
        ...state,
        ...updatedQuestions,
      };
    }
    default:
      return state;
  }
};

export default questions;
