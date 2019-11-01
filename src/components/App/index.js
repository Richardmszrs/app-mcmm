import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from '../Navigation';
import DashboardPage from '../Dashborad';
import TransactionsPage from '../Transactions';
import AccountsPage from '../Accounts';
import BudgetsPage from '../Budgets';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const classes = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


const App = () => (
  <Router>
    <Navigation />
    <React.Fragment>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Route exact path={ROUTES.DASHBOARD} component={DashboardPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.TRANSACTIONS} component={TransactionsPage} />
          <Route path={ROUTES.ACCOUNTS} component={AccountsPage} />
          <Route path={ROUTES.BUDGETS} component={BudgetsPage} />
        </Grid>
      </Container>
      </main>
    </React.Fragment>
  </Router>
);
export default withAuthentication(App);