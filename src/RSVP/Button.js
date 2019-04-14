/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { animated, useSpring } from 'react-spring';
import { useState } from 'react';
import { withRouter } from 'react-router';

const Button = withRouter(({ formal, text, history }) => {
  const [toggle, toggleClicked] = useState(false);
  const props = useSpring({ x: toggle ? 0 : 1 });

  const range = [0, 0.5, 1];
  const style = {
    transform: props.x
      .interpolate({ range, output: [0, 5, 0] })
      .interpolate(x => {
        const scale = 1 - x / 20;
        return `translateY(${x}px) scale(${scale})`;
      }),
    boxShadow: props.x
      .interpolate({ range, output: [8, 4, 8] })
      .interpolate(spread => {
        return `0 8px ${spread}px -6px rgba(0, 0, 0, 0.5)`;
      }),
  };

  const buttonStyle = css`
    padding: 0.5rem 1.5rem;
    background-color: rgb(112, 15, 0);
    outline: none;
    color: white;
    border-style: none;
    font-family: 'Mont';
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: rgba(112, 15, 0, 0.8);
    }
    &:disabled {
      cursor: not-allowed;
      background-color: rgba(112, 15, 0, 0.5);
    }
  `;

  let { disabled, type } = formal.isSubmitted
    ? { disabled: false, type: 'button' }
    : formal.getSubmitButtonProps();

  return (
    <animated.button
      css={buttonStyle}
      style={style}
      disabled={disabled}
      type={type}
      onClick={() => {
        toggleClicked(!toggle);
        if (formal.isSubmitted) {
          history.push('/guests');
        }
      }}
    >
      {text}
    </animated.button>
  );
});

export default Button;
