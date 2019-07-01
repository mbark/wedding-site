/** @jsx jsx */
import ReactDOM from 'react-dom';
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { Image } from 'cloudinary-react';

function HideOverlay({ onHide }) {
  return ReactDOM.createPortal(
    <div
      onClick={onHide}
      css={css`
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 999;
      `}
    />,
    document.body,
  );
}

export default function PersonInfo({ person, onHide }) {
  return (
    <div>
      <HideOverlay onHide={onHide} />
      <div
        css={theme => css`
          position: fixed;
          z-index: 1000;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 320px;
          height: 200px;
          border: 1px solid ${theme.colors.red.string()};
          border-radius: 4px;
          box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
          background-color: ${theme.colors.red
            .mix(theme.colors.peach, 0.8)
            .string()};
          padding: 1rem;
          display: flex;
        `}
      >
        <div
          css={css`
            align-self: center;
            justify-self: center;
            margin-right: 1rem;
          `}
        >
          <Image publicId={`${person.id}-more`} width="140" height="140" />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <h4
            css={theme => css`
              margin-bottom: 0.5rem;
              font-family: ${theme.fonts.openSans};
            `}
          >
            {person.name}
          </h4>
          <p
            css={css`
              font-size: 0.8rem;
              margin-top: 0;
            `}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
}
