'use client';

import React, { useState, useEffect } from 'react';
import styles from './NavBar.module.css';
import { useAuthContext } from '@/app/contexts/AuthContext';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clientReady, setClientReady] = useState(false);
  const { user } = useAuthContext();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    setClientReady(true); // Ensures this only renders after hydration
  }, []);

  const username = clientReady && user?.payload.username ? user.payload.username.split('@')[0] : null;

  return (
    <>
      <nav className={styles.navbar_container}>
        <div className={styles.logo}>
          <li><a href="/dashboard">Dashboard</a></li>
        </div>

        {/* desktop */}
        <ul className={styles.desktop_menu}>
          <li className={styles.user_li_container}>
            {
                clientReady && username ? (
                    username[0].toUpperCase()
                ): (
                    <img src='/medias/svgs/loading-spinner.svg' alt='...' style={{ width: '60%' }}/>
                )
            }
          </li>

        </ul>

        <button
          aria-label={menuOpen ? "Close Menu" : "Open Menu"}
          onClick={toggleMenu}
          className={styles.menu_button}
          aria-expanded={menuOpen}
        >
          <div className={styles.bar} />
          <div className={styles.bar} />
          <div className={styles.bar} />
        </button>
      </nav>

      <div
        className={`${styles.slideout_menu} ${menuOpen ? styles.open : ''}`}
      >
        <button
          aria-label="Close Menu"
          onClick={toggleMenu}
          className={styles.close_button}
        >
          &times;
        </button>
        
        {/* mobile */}
        <ul className={styles.menu_list}>

          <li className={styles.user_li_container}>
            {
                clientReady && username ? (
                    username[0].toUpperCase()
                ): (
                    <img src='/medias/svgs/loading-spinner.svg' alt='...' style={{ width: '60%' }}/>
                )
            }
          </li>
          
        </ul>
      </div>

      {menuOpen && <div className={styles.overlay} onClick={toggleMenu} />}
    </>
  );
};

export default NavBar;
