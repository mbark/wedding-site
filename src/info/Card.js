/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { navbarHeight } from '../Navbar';

export default function Card({ title, children }) {
  return (
    <div
      css={theme => css`
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: 4px;
        background-color: ${theme.colors.peachRed.string()};
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
      `}
    >
      <div
        css={css`
          padding: 1rem 1rem 0 1rem;
          border-radius: 4px;
        `}
      >
        {children}
      </div>

      <h2
        css={theme => css`
          position: sticky;
          left: 0;
          bottom: ${navbarHeight};
          margin-block-end: 0;
          background-color: ${theme.colors.peachRed.string()};
          padding: 1rem;
          border-radius: 4px;

          @media (min-width: ${theme.media.phone}px) {
            bottom: 0;
          }
        `}
      >
        {title}
      </h2>
    </div>
  );
}
