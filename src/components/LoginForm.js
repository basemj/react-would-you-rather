/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Button, Form, Row, Col } from "react-bootstrap";
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
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Login</h1>
          <Form onSubmit={this.handleFormsubmit || '/'}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Select user</Form.Label>
              <Form.Control
                as="select"
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
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!userSelection}>
              Sign in
            </Button>
          </Form>
        </Col>
      </Row>
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
