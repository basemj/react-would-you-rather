import { RECEIVE_USERS, SAVE_USER_ANSWERS, SAVE_USER_QUESTION } from '../actions/users';

const users = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };

    case SAVE_USER_ANSWERS: {
      const {
        authedUser,
        qid,
        answer
      } = action;

      const updatedUsers = {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };

      return {
        ...state,
        ...updatedUsers,
      };
    }

    case SAVE_USER_QUESTION: {
      const {authedUser, id} = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          questions: state[authedUser].questions.concat([id]),
        },
      };
    }

    default:
      return state;
  }
};

export default users;
