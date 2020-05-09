import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Navbar } from "react-bootstrap";
import { setAuthedUser } from '../actions/authedUser';
import styles from './authedUserInfo.module.css';

class AuthedUserInfo extends Component {
  logout = () => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(''));
  };

  render() {
    const { authedUser, avatarURL, name } = this.props;

    return (
      authedUser && (
        <Navbar.Text>
          {`Hello ${name}`}          
          <img alt={`${name}'s avatar`} className={styles.avatar} src={`/assets/${avatarURL}`} />
          <Button onClick={this.logout}>Logout</Button>
        </Navbar.Text>
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
