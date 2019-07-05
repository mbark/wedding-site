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
        padding: 1rem;
        border-radius: 4px;
        background-color: ${theme.colors.red
          .mix(theme.colors.peach, 0.9)
          .string()};
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
      `}
    >
      <h2
        css={css`
          align-self: flex-end;
          position: sticky;
          left: 0;
          bottom: ${navbarHeight};
          word-spacing: 100vw;
          width: min-content;
          margin-block-end: 0;
          margin-right: 1rem;
        `}
      >
        {title}
      </h2>

      {children}
    </div>
  );
}
