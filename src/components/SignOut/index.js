import React from 'react';
import { withFirebase } from '../Firebase';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
var BtnStyle = {
  marginLeft: 'auto',
};
const SignOutButton = ({ firebase }) => (
  <Button style={BtnStyle} color="inherit" onClick={firebase.doSignOut}>
    <ExitToAppIcon />
    Sign Out
  </Button>
);
export default withFirebase(SignOutButton);