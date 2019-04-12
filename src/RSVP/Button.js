/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { animated, useSpring } from 'react-spring';

export default function Button({ formal, text }) {
  const defaultStyle = {
    transform: 'translateY(0px) scale(1)',
    boxShadow: '0 8px 10px -6px black',
  };

  const [buttonSpring, setButtonSpring] = useSpring(() => ({
    ...defaultStyle,
    config: {
      velocity: 20,
      tension: 250,
      friction: 10,
    },
  }));

  const buttonStyle = css`
    padding: 0.5rem 1.5rem;
    background-color: rgb(112, 15, 0);
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

  return (
    <animated.button
      css={buttonStyle}
      style={buttonSpring}
      {...formal.getSubmitButtonProps()} 
      onMouseLeave={() => setButtonSpring(defaultStyle)}
      onClick={() =>
        setButtonSpring({
          transform: 'translateY(5px) scale(0.9)',
          boxShadow: '0 8px 6px -6px black',
        })
      }
    >
      {text}
    </animated.button>
  );
}
