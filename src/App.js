import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { handleReceiveQuestions } from './actions/questions';
import Home from './routes/Home';
import Login from './routes/Login';
import AuthedUserInfo from './components/AuthedUserInfo';
import PrivateRoute from './components/PrivateRoute';
import PageNotFound from './components/PageNotFound';
import Navigation from './components/Navigation';
import NewQuestion from './routes/NewQuestion';
import Leaderboard from './routes/Leaderboard';
import Question from './routes/Question';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleReceiveQuestions());
  }

  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <AuthedUserInfo />
        <Switch>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path="/new-question">
            <NewQuestion />
          </PrivateRoute>
          <PrivateRoute exact path="/leaderboard">
            <Leaderboard />
          </PrivateRoute>
          <PrivateRoute exact path="/questions/:id">
            <Question />
          </PrivateRoute>
          <Route exact path="/login" component={Login} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
