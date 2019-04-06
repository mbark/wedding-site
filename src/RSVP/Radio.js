/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';

export default function Radio({ name, value, onChange, form, ...props }) {
  const id = `${name}-${value}`;
  const toggleStyle = css`
    height: 0;
    width: 0;
    position: absolute;
    opacity: 0;
    bottom: 0;
    left: 0.3rem;
    &:checked + label {
      background-color: #700f00;
    }
    &:focus + label {
      border-color: #700f00;
    }
    & + label {
      cursor: pointer;
      text-indent: -9999px;
      width: 0.6em;
      height: 0.6em;
      border: 3px solid rgba(112, 15, 0, 0.2);
      display: inline-block;
      border-radius: 0.6em;
      position: relative;
      transition: all 0.2s;
      &:hover {
        border-color: #700f00;
      }
    }
  `;

  return (
    <div
      css={css`
        margin-right: 1rem;
        display: inline-flex;
        align-items: center;
        position: relative;
      `}
    >
      <input
        required
        type="radio"
        id={id}
        name={name}
        value={value}
        css={toggleStyle}
        checked={value === form[name]}
        onChange={onChange(value)}
        {...props}
      />
      <label htmlFor={id} />
      <label htmlFor={id}>{value}</label>
    </div>
  );
}
