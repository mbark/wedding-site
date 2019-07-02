/** @jsx jsx */
import { jsx } from '@emotion/core';
import { animated, useSpring } from 'react-spring';
import css from '@emotion/css/macro';
import { Image } from 'cloudinary-react';

export default function Person({ person, isExpanded, onClick }) {
  const props = useSpring({ x: isExpanded ? 0 : 1 });

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

  return (
    <div
      css={css`
        grid-column-end: span 1;
        grid-row-end: span 1;
      `}
      onClick={onClick}
    >
      <div
        css={css`
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <animated.div
          style={style}
          css={theme => css`
            height: 120px;
            width: 120px;
            border-radius: 100%;
            overflow: hidden;
            border: 1px solid ${theme.colors.red.string()};
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
          `}
        >
          <Image publicId={`${person.id}-default`} width="120" height="120" />
        </animated.div>

        <h4
          css={theme => css`
            margin-top: 0.5rem;
            margin-bottom: 0rem;
            font-family: ${theme.fonts.openSans};
            text-transform: none;
            text-align: center;
          `}
        >
          {person.name.split(' ')[0]}
        </h4>
      </div>
    </div>
  );
}
