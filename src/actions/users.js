import { _getUsers } from '../utils/_DATA';

const RECEIVE_USERS = 'RECEIVE_USERS';
const SAVE_USER_ANSWERS = 'SAVE_USER_ANSWERS';
const SAVE_USER_QUESTION = 'SAVE_USER_QUESTIONS';

const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};

const saveUserAnswers = (authedUser, qid, answer) => {
  return {
    type: SAVE_USER_ANSWERS,
    authedUser,
    qid,
    answer,
  };
};

const saveUserQuestion = (authedUser, id) => {
  return {
    type: SAVE_USER_QUESTION,
    authedUser,
    id,
  };
};

const handleReceiveUsers = () => {
  return dispatch => {
    return _getUsers()
      .then(users => dispatch(receiveUsers(users)));
  };
};

export {
  RECEIVE_USERS,
  SAVE_USER_ANSWERS,
  SAVE_USER_QUESTION,
  saveUserAnswers,
  saveUserQuestion,
  handleReceiveUsers,
};
