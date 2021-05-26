import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <form action='/signup'>
          <button>Sign Up</button>
        </form>
      </>
    );
  }

  return (
    <ul>
      <div className='navBar'>
        <NavLink exact to="/" >Home</NavLink>
        <NavLink exact to="/create">Create a business!</NavLink>
        <NavLink to="/businesses">Hungry?</NavLink>
        {isLoaded && sessionLinks}
      </div>
    </ul>
  );
}

export default Navigation;
