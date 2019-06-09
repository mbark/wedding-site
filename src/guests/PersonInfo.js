/** @jsx jsx */
import { useEffect, useRef } from 'react';
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';

export default function PersonInfo({ person, onHide }) {
  const node = useRef();

  useEffect(() => {
    const onClick = e => {
      if (node.current.contains(e.target)) {
        return;
      }

      onHide();
    };

    document.addEventListener('mousedown', onClick);

    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  }, [node, onHide]);

  return (
    <div ref={node}>
      <div
        css={theme => css`
          position: absolute;
          z-index: 1000;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
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
        <img
          src={`/gallery/${person.id}-more.png`}
          alt=""
          css={css`
            align-self: center;
            justify-self: center;
            height: 140px;
            margin-right: 1rem;
          `}
        />
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
