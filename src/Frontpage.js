/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import Countdown from './Countdown';
import { useSpring, animated, config, useChain } from 'react-spring';
import { useRef } from 'react';

export default function Frontpage() {
  const headerRef = useRef();
  const spring = useSpring({
    from: {
      opacity: 0,
      transform: 'translateX(-100px)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(0)',
    },
    config: config.gentle,
    ref: headerRef,
  });

  const countdownRef = useRef();
  const countdownSpring = useSpring({
    from: {
      transform: 'translateY(-30px)',
      opacity: 0,
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1,
    },
    ref: countdownRef,
  });
  useChain([headerRef, countdownRef]);

  return (
    <div
      css={css`
        margin-bottom: 4rem;
        margin-left: 2rem;
        margin-top: auto;
      `}
    >
      <animated.h1
        style={spring}
        css={css`
          margin-top: 0;
          margin-bottom: 0;
          word-spacing: 100vw;
        `}
      >
        We are getting married
      </animated.h1>
      <Countdown style={countdownSpring} />
    </div>
  );
}
