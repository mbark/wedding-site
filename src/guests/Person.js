/** @jsx jsx */
import { jsx } from '@emotion/core';
import { animated, useSpring } from 'react-spring';
import css from '@emotion/css/macro';
import { Image, Transformation } from 'cloudinary-react';
import LazyLoad from 'react-lazyload';
import theme from '../theme';
import { useMemo } from 'react';

export function usePhoneQuery() {
  return useMemo(
    () => window.matchMedia(`(max-width: ${theme.media.phone - 1}px)`).matches,
    [],
  );
}

export default function Person({ person, isExpanded, onClick }) {
  const props = useSpring({ x: isExpanded ? 0 : 1 });

  const isPhone = usePhoneQuery();
  const imageSize = isPhone ? 120 : 180;

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
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <animated.div
        style={style}
        css={theme => css`
          height: ${imageSize}px;
          width: ${imageSize}px;
          border-radius: 100%;
          overflow: hidden;
          border: 1px solid ${theme.colors.red.string()};
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        `}
        onClick={onClick}
      >
        <LazyLoad height={imageSize}>
          <Image
            publicId={`${person.id}-default`}
            width={imageSize}
            height={imageSize}
          >
            <Transformation quality="auto" fetchFormat="auto" />
          </Image>
        </LazyLoad>
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
  );
}
