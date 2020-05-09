/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { handleReceiveUsers } from '../actions/users';
import { setAuthedUser } from '../actions/authedUser';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelection: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleReceiveUsers());
  }

  handleSelectChange = event => {
    const { value } = event.target;
    this.setState({
      userSelection: value,
    });
  };

  handleFormsubmit = event => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { userSelection } = this.state;
    dispatch(setAuthedUser(userSelection));
  };

  render() {
    const { users, authedUser, location } = this.props;
    const { userSelection } = this.state;

    return authedUser ? (
      <Redirect to={location.state.from.pathname} />
    ) : (
      <form onSubmit={this.handleFormsubmit || '/'}>
        <label htmlFor="userSelect" />
        <select
          id="userSelect"
          value={userSelection}
          onChange={this.handleSelectChange}
          disabled={!users.length > 0}
        >
          <option value="">Select...</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={!userSelection}>
          Sign in
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  authedUser: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({state: PropTypes.object}).isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
};

LoginForm.defaultProps = {
  authedUser: '',
  users: [],
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    users: Object.values(users),
  };
};

export default connect(mapStateToProps)(withRouter(LoginForm));
