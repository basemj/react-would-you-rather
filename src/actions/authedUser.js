const SET_AUTHED_USER = 'SET_AUTHED_USER';

function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export { SET_AUTHED_USER, setAuthedUser };
