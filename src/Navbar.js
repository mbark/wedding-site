/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { NavLink } from 'react-router-dom';
import Home from './resources/images/us.png';
import Rsvp from './resources/images/rsvp.png';
import Info from './resources/images/info.png';
import Guests from './resources/images/guests.png';

export const navbarHeight = '80px';

export default function Navbar() {
  const navElement = (img, text, path) => {
    return (
      <NavLink
        exact
        to={path}
        activeClassName="active"
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          opacity: 0.6;

          &.active {
            opacity: 1;
          }
        `}
      >
        <img
          src={img}
          alt=""
          css={css`
            height: 40px;
            width: 40px;
            margin-bottom: 0.3rem;
          `}
        />
        <h4
          css={css`
            color: white;
            font-size: 0.8rem;
            margin-bottom: 0;
          `}
        >
          {text}
        </h4>
      </NavLink>
    );
  };

  return (
    <nav
      css={css`
        position: fixed;
        width: 100%;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
        background-color: rgba(181, 91, 75, 1);
        height: ${navbarHeight};
        display: flex;
        justify-content: space-around;
        align-items: center;

        @media (max-width: 767px) {
          bottom: 0;
        }

        @media (min-width: 768px) {
          top: 0;
        }
      `}
    >
      {navElement(Home, 'Home', '/')}
      {navElement(Rsvp, 'RSVP', '/rsvp')}
      {navElement(Info, 'Info', '/info')}
      {navElement(Guests, 'Guests', '/guests')}
    </nav>
  );
}
