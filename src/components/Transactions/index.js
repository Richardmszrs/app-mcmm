import React from 'react';
import SignOutButton from '../SignOut';
import { withAuthorization } from '../Session';

const Transactions = () => (
  <div className='gloabl-wrapper'>
    <h1>Transactions</h1>
    
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Transactions);