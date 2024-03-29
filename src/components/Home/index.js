import React from 'react';
import SignOutButton from '../SignOut';
import { withAuthorization } from '../Session';

const Home = () => (
  <div className='gloabl-wrapper'>
    <h1>Home</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <SignOutButton />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);