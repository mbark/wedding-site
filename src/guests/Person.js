/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { Image } from 'cloudinary-react';

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
            border-radius: 100%;
            overflow: hidden;
            border: 1px solid ${theme.colors.red.string()};
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
          `}
        >
          <Image publicId={`${person.id}-default`} width="120" height="120" />
        </div>

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
