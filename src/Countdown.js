/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { DateTime } from 'luxon';
import { useEffect, useRef, useState } from 'react';
import { animated } from 'react-spring';

const countdownTo = DateTime.local(2019, 9, 28, 16);

const getTimer = now => {
  const { days, hours, minutes, seconds } = countdownTo
    .diff(now)
    .shiftTo('days', 'hours', 'minutes', 'seconds')
    .toObject();

  return [
    { time: days, unit: 'days ' },
    { time: hours, unit: 'hours ' },
    { time: minutes, unit: 'minutes ' },
    { time: Math.floor(seconds), unit: 'seconds' },
  ];
};

export default function Countdown({ style }) {
  const [timer, setTimer] = useState(getTimer(DateTime.local()));
  useInterval(() => {
    setTimer(getTimer(DateTime.local()));
  }, 1000);

  return (
    <animated.div
      style={style}
      css={css`
        text-transform: uppercase;
        font-size: 0.7em;
      `}
    >
      in {timer.map(item => `${item.time} ${item.unit}`)}
    </animated.div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
