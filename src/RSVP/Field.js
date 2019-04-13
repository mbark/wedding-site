/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { rowStyle } from './styles';

export default function Field({ name, title, formal }) {
  const inputStyle = css`
    outline: none;
    border-radius: 6px;
    border: 2px solid rgba(112, 15, 0, 0.2);
    background-color: rgba(112, 15, 0, 0.2);
    background-clip: padding-box;
    padding: 4px 6px;
    color: white;
    &:focus {
      border-bottom-color: rgba(112, 15, 0);
    }
  `;

  return (
    <div css={rowStyle}>
      <label htmlFor={name}>{title}</label>
      <input css={inputStyle} {...formal.getFieldProps(name)} type="text" />
      {formal.errors[name] && <div>{formal.errors[name]}</div>}
    </div>
  );
}
