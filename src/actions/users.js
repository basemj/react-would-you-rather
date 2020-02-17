import { _getUsers } from '../utils/_DATA';

const RECEIVE_USERS = 'RECEIVE_USERS';

const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};

const handleReceiveUsers = () => {
  return dispatch => {
    return _getUsers().then(users => dispatch(receiveUsers(users)));
  };
};

export { RECEIVE_USERS, handleReceiveUsers };
