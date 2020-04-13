import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

class AuthedUserInfo extends Component {
  logout = () => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(''));
  };

  render() {
    const { authedUser, avatarURL, name } = this.props;

    return (
      authedUser && (
        <div>
          <span>
            Hello
            {name}
          </span>
          <img src={`/assets/${avatarURL}`} alt="" />
          <button type="button" onClick={this.logout}>
            Logout
          </button>
        </div>
      )
    );
  }
}

AuthedUserInfo.propTypes = {
  authedUser: PropTypes.string,
  avatarURL: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string,
};

AuthedUserInfo.defaultProps = {
  authedUser: '',
  avatarURL: '',
  name: '',
};

const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser];
  const name = user && user.name;
  const avatarURL = user && user.avatarURL;

  return {
    authedUser,
    name,
    avatarURL,
  };
};

export default connect(mapStateToProps)(withRouter(AuthedUserInfo));
