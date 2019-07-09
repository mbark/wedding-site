/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';

export default function HideOverlay({ onHide }) {
  return (
    <div
      onClick={onHide}
      css={css`
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 100;
        background-color: black;
        opacity: 0.2;
      `}
    />
  );
}
