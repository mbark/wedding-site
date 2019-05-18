/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import * as Color from 'color';

const imageSize = 160;

export default function Person({ imgPrefix, name, start }) {
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(500px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 60 },
  });

  const cardCss = theme => css`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${Color(theme.colors.lightGreen).string()};
    border-radius: 10px;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
  `;

  const imgCss = css`
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100%;
    height: ${imageSize}px;
    width: ${imageSize}px;
    object-fit: contain;
  `;

  const title = (
    <h4
      css={css`
        margin: auto 0;
        font-family: 'Open Sans';
        text-transform: none;
        text-align: center;
      `}
    >
      {name}
    </h4>
  );

  return (
    <div
      css={css`
        grid-column-start: ${start};
        grid-column-end: span 1;
        position: relative;
      `}
    >
      <animated.div
        onClick={() => setFlipped(!flipped)}
        css={cardCss}
        style={{ opacity: opacity.interpolate(o => 1 - o), transform }}
      >
        {title}
        <div
          css={css`
            ${imgCss}
            background-image: url(/gallery/${imgPrefix}-default.png);
            margin-bottom: 0;
          `}
        />
      </animated.div>
      <animated.div
        onClick={() => setFlipped(!flipped)}
        css={cardCss}
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateY(180deg)`),
        }}
      >
        <p css={css`
        text-align: center;
        margin: auto 0.5rem;
        font-size: 0.8rem;
        `}>Wow! This is the groom you guys.</p>
        <div
          css={css`
            ${imgCss}
            background-image: url(/gallery/${imgPrefix}-hover.png);
          `}
        />
      </animated.div>
    </div>
  );
}

// <Waypoint
//   topOffset="200px"
//   bottomOffset="200px"
//   onEnter={() => setInWaypoint(true)}
//   onLeave={() => setInWaypoint(false)}
// >
/* </Waypoint> */
