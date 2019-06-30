/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';

export default function Field({
  name,
  title,
  formal,
  inputProps,
  error,
  value,
}) {
  const hasValue = formal ? formal.values[name] : !!value;
  const fieldError = formal ? formal.errors[name] : error;
  const fieldProps = formal ? formal.getFieldProps(name) : inputProps;

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
    background-color: ${theme.colors.peachRed.string()};
    padding: 20px 10px 10px 10px;
    color: ${theme.colors.black.string()};
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
    background: ${theme.colors.red.string()};
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
    ${hasValue && hoveringLabel}
  `;

  return (
    <div
      css={css`
        margin-bottom: 1rem;
      `}
    >
      <div css={containerStyle}>
        <input css={inputStyle} type="text" {...fieldProps} />
        <span css={barStyle} />
        <label css={labelStyle} htmlFor={name}>
          {title}
        </label>
      </div>
      {fieldError && (
        <span
          css={css`
            font-weight: bold;
          `}
        >
          {fieldError}
        </span>
      )}
    </div>
  );
}

Field.defaultProps = {
  inputProps: {},
};
