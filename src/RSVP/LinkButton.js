/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';

export default function LinkButton({ children, ...props }) {
  const fadedColor = theme =>
    theme.colors.red.mix(theme.colors.peach, 0.4).string();

  return (
    <button
      css={theme => css`
        padding: 0.5rem 1.5rem;
        border: 1px solid ${fadedColor(theme)};
        color: ${fadedColor(theme)};
        border-radius: 6px;
        background-color: transparent;
        width: fit-content;
        outline: none;
        will-change: background-color;
        transition: background-color 0.2s;

        &:hover {
          border-color: ${theme.colors.red.string()};
          color: ${theme.colors.red.string()};
        }
      `}
      {...props}
    >
      {children}
    </button>
  );
}
