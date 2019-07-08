/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { useSpring, animated } from 'react-spring';
import BirdImage from './resources/images/bird.png';
import { navbarHeight } from './Navbar';

export default function Bird() {
  const animateTo = {
    transform: 'translateY(0)',
    opacity: 1,
  };

  const [props, set] = useSpring(() => ({
    transform: 'translateY(-100%)',
    opacity: 0,
    config: { mass: 2, tension: 200, friction: 20 },
  }));

  return (
    <animated.div
      style={props}
      css={theme => css`
        position: absolute;
        height: 7rem;
        top: 0;
        left: 2rem;
        display: flex;
        z-index: -1;
        &:before {
          content: '';
          position: absolute;
          height: 140%;
          border-right: 0.05rem solid black;
          left: 47.5%;
          bottom: 25%;
          z-index: -1;
          box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.1);
        }

        @media (min-width: ${theme.media.phone}px) {
          top: calc(${navbarHeight} + 1rem);
          height: 5rem;
        }
      `}
    >
      <img
        css={css`
          width: 6rem;
          margin-top: auto;
          filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.1));
        `}
        src={BirdImage}
        alt=""
        onLoad={() => set(animateTo)}
      />
    </animated.div>
  );
}
