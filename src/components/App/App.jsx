import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import HomePage from '../HomePage/HomePage';
import PatientPage from '../PatientPage/PatientPage';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Redirect from root to login or home based on user authentication */}
          <Route exact path="/">
            {user.id ? <Redirect to="/home" /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/about">
            <AboutPage />
          </Route>

          <ProtectedRoute exact path="/user">
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/info">
            <InfoPage />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? <Redirect to="/user" /> : <LoginPage />}
          </Route>

          <Route exact path="/registration">
            {user.id ? <Redirect to="/user" /> : <RegisterPage />}
          </Route>

          {/* Use ProtectedRoute for the HomePage to enforce user authentication */}
          <ProtectedRoute exact path="/home">
            <HomePage />
          </ProtectedRoute>

          {/* Use ProtectedRoute for PatientPage to enforce user authentication */}
          <ProtectedRoute exact path="/patient">
            <PatientPage />
          </ProtectedRoute>

          {/* Catch-all route for unmatched paths */}
          <Route>
            <h1>404 - Page Not Found</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
