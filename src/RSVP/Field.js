/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';

export default function Field({ name, title, formal }) {
  const containerStyle = css`
    position: relative;
    width: 300px;
    padding: 1px;
    border-radius: 6px;
    z-index: 1;
    display: flex;
    flex-direction: column;
  `;

  const hoveringLabel = css`
    top: 10px;
    transform: translateY(-50%);
    font-size: 0.8em;
  `;

  const withBorder = css`
    opacity: 1;
    width: 100%;
    height: 100%;
  `;

  const inputStyle = theme => css`
    height: 100%;
    outline: none;
    border-radius: 6px;
    border: none;
    background-color: ${theme.colors.peachRed};
    padding: 20px 10px 10px 10px;
    color: white;
    z-index: 2;

    &:focus {
      & ~ label {
        ${hoveringLabel}
      }

      & ~ span {
        ${withBorder}
      }
    }
  `;

  const barStyle = theme => css`
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 0;
    width: 0;
    opacity: 0;
    background: ${theme.colors.red};
    border-radius: 7px;
    transition: opacity 0.1s, height 0.3s, width 0.3s 0.1s;
  `;

  const labelStyle = css`
    position: absolute;
    pointer-events: none;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    transition: 0.2s ease all;
    ${formal.values[name] && hoveringLabel}
  `;

  return (
    <div
      css={css`
        margin-bottom: 1rem;
      `}
    >
      <div css={containerStyle}>
        <input css={inputStyle} {...formal.getFieldProps(name)} type="text" />
        <span css={barStyle} />
        <label css={labelStyle} htmlFor={name}>
          {title}
        </label>
      </div>
      {formal.errors[name] && (
        <span
          css={css`
            font-weight: bold;
          `}
        >
          {formal.errors[name]}
        </span>
      )}
    </div>
  );
}
