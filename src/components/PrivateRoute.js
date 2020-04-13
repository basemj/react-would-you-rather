/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */

import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ children, authedUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authedUser.length ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  authedUser: PropTypes.string,
  children: PropTypes.object.isRequired,
};

PrivateRoute.defaultProps = {
  authedUser: '',
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
