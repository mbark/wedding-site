/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { rowStyle } from './styles';

export default function Checkbox({ name, value, title, formal }) {
  const toggleStyle = css`
    height: 0;
    width: 0;
    position: absolute;
    opacity: 0;
    bottom: 0;
    left: 0.5rem;

    & + label {
      cursor: pointer;
      text-indent: -9999px;
      width: 1em;
      height: 1em;
      border: 3px solid rgba(112, 15, 0, 0.2);
      border-radius: 4px;
      transition: background-color 0.2s;

      &:hover {
        border-color: #700f00;
      }
    }

    &:checked + label {
      position: relative;
      border-color: #700f00;

      &::before {
        content: '';
        position: absolute;
        height: 70%;
        width: 70%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #700f00;
      }
    }

    &:focus + label {
      border-color: #700f00;
    }
  `;

  return (
    <div css={rowStyle}>
      <label
        css={css`
          margin-right: 1rem;
          display: flex;
          align-items: center;
          position: relative;
        `}
      >
        <input
          id={name}
          type="checkbox"
          name={name}
          value={value}
          checked={formal.values[name]}
          onChange={e => formal.change(name, e.target.checked)}
          css={toggleStyle}
        />
        <label
          htmlFor={name}
          css={css`
            margin-right: 0.5rem;
          `}
        />
        <span>{title}</span>
      </label>
    </div>
  );
}
