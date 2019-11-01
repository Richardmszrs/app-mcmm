import React, { Component } from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const AccountsPage = () => (
  <div className='gloabl-wrapper'>
    <h1>Accounts</h1>
    <Accounts />
  </div>
);

class AccountsBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accName: '',
      loading: false,
      accounts: [],
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.accounts().on('value', snapshot => {
      const accountObject = snapshot.val();
      if (accountObject) {
        const accountList = Object.keys(accountObject).map(key => ({
          ...accountObject[key],
          uid: key,
        }));
        this.setState({
          accounts: accountList,
          loading: false,
        });
      } else {
        this.setState({ accounts: null, loading: false });
      }
    });
  }
  componentWillUnmount() {
    this.props.firebase.accounts().off();
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onCreateAccount = (event, authUser) => {
    console.log(authUser);
    if(this.state.accName !== '') {
      this.props.firebase.accounts().push({
        accName: this.state.accName,
        balance: this.state.balance,
        userId: authUser.uid,
        userEmail: authUser.email,
      });
      this.setState({ accName: '', balance: '' });
    }
    event.preventDefault();
  };
  onRemoveAccount = uid => {
    this.props.firebase.accounts(uid).remove();
  };
  render() {
    const { balance, accName, accounts, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
      <div>
        {loading && <div>Loading ...</div>}
        {accounts ? (
          <AccountList accounts={accounts} onRemoveAccount={this.onRemoveAccount} />
        ) : (
          <div>There are no messages ...</div>
        )}
        <form className="mt" onSubmit={event => this.onCreateAccount(event, authUser)}>
          {/* <input
            type="text"
            value={accName}
            onChange={this.onChangeAccName}
          />
          <button type="submit">Send</button> */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="accName"
                id="accName"
                label="Acc Name"
                value={accName}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="CurrentBalance"
                type="number"
                id="balance"
                name="balance"
                value={balance}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Save it
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      )}
      </AuthUserContext.Consumer>
    );
  }
}
const Accounts = withFirebase(AccountsBase);

const AccountList = ({ accounts, onRemoveAccount }) => (
  <Paper className="paper_root">
      <Table className="table_acc">
        <TableHead>
          <TableRow>
            <TableCell>Account Name</TableCell>
            <TableCell align="center">Current Balance</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map(account => (
            <AccountItem 
              key={account.uid} 
              account={account}
              onRemoveAccount={onRemoveAccount}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
);
const AccountItem = ({ account, onRemoveAccount }) => (
  // <li>
  //   <strong>{account.accName}</strong>
  //   <button
  //     type="button"
  //     onClick={() => onRemoveAccount(account.uid)}
  //   >
  //     Delete
  //   </button>
  // </li>
  <TableRow>
    <TableCell component="th" scope="row">
      {account.accName}
    </TableCell>
    <TableCell align="center">{account.balance} €</TableCell>
    <TableCell align="center">
      <Button variant="outlined" color="secondary" onClick={() => onRemoveAccount(account.uid)}>
        Delete
      </Button>
    </TableCell>
</TableRow>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountsPage);