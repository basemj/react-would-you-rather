import { RECEIVE_USERS, SAVE_USER_ANSWERS } from '../actions/users';

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
    default:
      return state;
  }
};

export default users;
