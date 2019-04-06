/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import React from 'react';

export default function OtherAttending() {
  const imageSize = '9rem';

  const Person = name => {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <div
          css={css`
            background: url(/gallery/${name}-default.png) center no-repeat;
            background-size: ${imageSize};
            height: ${imageSize};
            width: ${imageSize};
            margin-bottom: 0.5rem;
            &:hover {
              background-image: url(/gallery/${name}-hover.png);
            }
          `}
        />
        <h4
          css={css`
            text-transform: uppercase;
          `}
        >
          {name}
        </h4>
      </div>
    );
  };

  return (
    <div css={css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto;
      grid-gap: 0.5rem;

    `}>
      {Person('martin')}
      {Person('martin')}
      {Person('martin')}
      {Person('martin')}
      {Person('martin')}
    </div>
  );
}
