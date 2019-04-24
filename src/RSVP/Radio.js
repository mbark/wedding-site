/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { rowStyle } from './styles';
import * as Color from 'color';

export default function Radio({ name, titles: { yes, no }, formal }) {
  const id = {
    yes: `${name}-yes`,
    no: `${name}-no`,
  };

  const toggleStyle = theme => css`
    height: 0;
    width: 0;
    position: absolute;
    opacity: 0;
    bottom: 0;
    left: 0.5rem;

    & + label {
      cursor: pointer;
      text-indent: -9999px;
      width: 1.3rem;
      height: 1.3rem;
      border: 3px solid
        ${Color(theme.colors.red)
          .mix(Color(theme.colors.peach), 0.8)
          .string()};
      border-radius: 999px;
      transition: background-color 0.2s;

      &:hover {
        border-color: ${theme.colors.red};
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
        background-color: ${theme.colors.red};
        border-radius: 999px;
      }
    }

    &:focus + label {
      border-color: ${theme.colors.red};
    }
  `;

  return (
    <div css={rowStyle}>
      <label
        css={css`
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          position: relative;
        `}
      >
        <input
          id={id.yes}
          type="radio"
          name={name}
          value="Yes"
          checked={formal.values[name] === 'Yes'}
          onChange={e => formal.change(name, e.target.value)}
          css={toggleStyle}
        />
        <label
          htmlFor={id.yes}
          css={css`
            margin-right: 0.5rem;
          `}
        />
        <span>{yes}</span>
      </label>
      <label
        css={css`
          display: flex;
          align-items: center;
          position: relative;
        `}
      >
        <input
          id={id.no}
          type="radio"
          name={name}
          value="No"
          checked={formal.values[name] === 'No'}
          onChange={e => formal.change(name, e.target.value)}
          css={toggleStyle}
        />
        <label
          htmlFor={id.no}
          css={css`
            margin-right: 0.5rem;
          `}
        />
        <span>{no}</span>
      </label>
    </div>
  );
}
