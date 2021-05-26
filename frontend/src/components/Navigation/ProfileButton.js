import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className='profileButton' onClick={openMenu}>
      <i class="fas fa-fish"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <ul>{user.username}</ul>
          <ul>{user.email}</ul>
          <ul>
            <button onClick={logout}>Log Out</button>
          </ul>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
