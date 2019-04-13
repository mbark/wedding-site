/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import React from 'react';
import { animated, useSpring, config } from 'react-spring';
import { usePrevious, useMeasure } from '../hooks';
import Checkbox from './Checkbox';
import Field from './Field';

export default function Form({ formal }) {
  const isAttending = formal.values.attending;

  const previous = usePrevious(isAttending);
  const [bind, { height: viewHeight }] = useMeasure();
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(-10%,0,0)' },
    to: {
      opacity: isAttending ? 1 : 0,
      height: isAttending ? viewHeight : 0,
      transform: `translate3d(${isAttending ? 0 : '10%'},0,0)`,
    },
    config: config.gentle,
  });

  return (
    <>
      <input
        type="text"
        css={css`
          display: none;
        `}
        {...formal.getFieldProps('non-human-input')}
      />
      <Field name="name" title="Name" formal={formal} />

      <Checkbox name="attending" formal={formal} title="I will be attending!" />

      <animated.div
        css={css`
          position: relative;
        `}
        style={{
          opacity,
          height: isAttending && previous === isAttending ? 'auto' : height,
        }}
      >
        <animated.div
          style={{ transform }}
          {...bind}
          css={css`
            ${isAttending
              ? ''
              : 'position: absolute; top: 0; pointer-events: none;'};
          `}
        >
          <Field name="food" title="Food preferences" formal={formal} />
          <Checkbox name="alcohol" value="No" formal={formal} title="Alcohol" />
        </animated.div>
      </animated.div>
    </>
  );
}
