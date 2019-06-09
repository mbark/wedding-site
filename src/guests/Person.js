/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';

export default function Person({ person, onClick }) {
  return (
    <div
      css={css`
        grid-column-end: span 1;
        grid-row-end: span 1;
      `}
      onClick={onClick}
    >
      <div
        css={css`
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <div
          css={theme => css`
            height: 120px;
            width: 120px;
            background-position: top;
            background-repeat: no-repeat;
            background-size: 100%;
            background-image: url(/gallery/${person.id}-default.png);
            object-fit: contain;
            border-radius: 100%;
            border: 1px solid ${theme.colors.red.string()};
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
          `}
        />
        <h4
          css={theme => css`
            margin-top: 0.5rem;
            margin-bottom: 0rem;
            font-family: ${theme.fonts.openSans};
            text-transform: none;
            text-align: center;
          `}
        >
          {person.name.split(' ')[0]}
        </h4>
      </div>
    </div>
  );
}
