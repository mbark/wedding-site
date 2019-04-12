/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { useEffect, useRef, useState } from 'react';
import { animated, useSpring, config } from 'react-spring';
import ResizeObserver from 'resize-observer-polyfill';
import Checkbox from './Checkbox';
import Button from './Button';
import Confetti from 'react-dom-confetti';
import useFormal from '@kevinwolf/formal-web';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  attending: yup.boolean().required(),
  food: yup.string(),
  alcohol: yup.boolean().when('attending', {
    is: true,
    then: yup.boolean().required(),
  }),
  'non-human-input': yup.string(),
});

const initialValues = {
  name: '',
  attending: false,
  food: '',
  alcohol: false,
  'non-human-input': '',
};

export default function RSVP() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const formal = useFormal(initialValues, {
    schema,
    onSubmit: values => {
      const formData = Object.keys(values).reduce((formData, key) => {
        formData.append(key, values[key]);
        return formData;
      }, new FormData());
      formData.append('form-name', 'rsvp');

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      })
        .then(() => setShowConfetti(values.attending))
        .then(() => setFormSubmitted(true))
        .catch(error => console.error(error));
    },
  });

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

  const buttonText = formal.values.attending
    ? 'Sign me up baby!'
    : 'See you another time?';

  const inputStyle = css`
    outline: none;
    border-radius: 6px;
    border: 2px solid rgba(112, 15, 0, 0.2);
    background-color: rgba(112, 15, 0, 0.2);
    background-clip: padding-box;
    padding: 4px 6px;
    margin-left: 2px;
    color: white;
    &:focus {
      border-bottom-color: rgba(112, 15, 0);
    }
  `;

  const rowStyle = css`
    margin-bottom: 1rem;
  `;

  const fieldsetStyle = css`
    border-width: 0;
    padding: 0;
    margin-left: 0;
    ${rowStyle}

    label {
      margin-right: 0.3rem;
    }
  `;

  const labelStyle = css`
    font-family: 'Mont';
    display: block;
  `;

  const confettiColors = [
    '#FFF',
    '#700F00',
    '#B55B4B',
    '#F2D6CC',
    '#2F4F07',
    '#89A673',
  ];

  return (
    <div
      css={css`
        margin: 0 1.5rem;
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <h1>RSVP</h1>
      <form
        method="post"
        {...formal.getFormProps()}
        css={css`
          display: flex;
          flex-direction: column;
          padding-bottom: 2rem;
          height: 100%;
          width: 100%;
        `}
      >
        <input
          type="text"
          css={css`
            display: none;
          `}
          {...formal.getFieldProps('non-human-input')}
        />
        <div css={rowStyle}>
          <label htmlFor="name" css={labelStyle}>
            Name
          </label>
          <input
            css={inputStyle}
            {...formal.getFieldProps('name')}
            type="text"
          />
        </div>

        <fieldset css={fieldsetStyle}>
          <legend css={labelStyle}>
            <Checkbox name="attending" formal={formal} /> I will be attending!
          </legend>
        </fieldset>

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
            <div css={rowStyle}>
              <label htmlFor="food" css={labelStyle}>
                Food preferences
              </label>
              <input
                css={inputStyle}
                {...formal.getFieldProps('food')}
                type="text"
              />
            </div>
            <fieldset css={fieldsetStyle}>
              <legend css={labelStyle}>
                <Checkbox name="alcohol" value="No" formal={formal} /> Alcohol
              </legend>
            </fieldset>
          </animated.div>
        </animated.div>

        <Confetti
          active={showConfetti}
          config={{ colors: confettiColors, elementCount: 60 }}
          css={css`
            transform: translateX(50%);
          `}
        />
        <Button formal={formal} text={buttonText} />
      </form>
    </div>
  );
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

export function useMeasure() {
  const ref = useRef();
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect)),
  );
  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [{ ref }, bounds];
}
