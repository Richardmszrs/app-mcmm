import React from 'react';
import SignOutButton from '../SignOut';
import { withAuthorization } from '../Session';

const Budgets = () => (
  <div className='gloabl-wrapper'>
    <h1>Budgets</h1>
    <p>The Budgets Page is accessible by every signed in user.</p>
    <SignOutButton />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Budgets);