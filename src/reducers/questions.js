import { RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWERS, SAVE_QUESTION } from '../actions/questions';

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

    case SAVE_QUESTION: {
      const {question} = action;
      return {
        ...state,
        [question.id]: question,
      };
    }

    default:
      return state;
  }
};

export default questions;
