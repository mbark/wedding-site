/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { useEffect, useRef, useState } from 'react';
import { animated, useSpring, config } from 'react-spring';
import ResizeObserver from 'resize-observer-polyfill';
import Radio from './Radio';
import Button from './Button';
import Confetti from 'react-dom-confetti';

export default function RSVP() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const onSubmission = event => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  const [form, setForm] = useState({
    name: '',
    attending: null,
    food: '',
    alcohol: null,
  });
  const isAttending = form.attending === 'Yes';

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

  let formValid = true;
  formValid = formValid && !!form.name;
  formValid = formValid && typeof form.attending === 'string';
  if (form.attending === 'Yes') {
    formValid = formValid && typeof form.alcohol === 'string';
  }

  let buttonText = 'Fill out required fields to sign up!';
  if (formValid) {
    buttonText = form.attending ? 'Sign me up baby!' : 'See you another time?';
  }

  const inputStyle = css`
    border-radius: 6px;
    border: 2px solid rgba(112, 15, 0, 0.2);
    background-color: rgba(112, 15, 0, 0.2);
    background-clip: padding-box;
    padding: 4px 6px;
    margin-left: 2px;
    color: white;
    &:focus {
      box-shadow: 0 0 4px rgba(112, 15);
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

  const onInputChange = event =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const onRadioChange = value => event =>
    setForm({ ...form, [event.target.name]: value });

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
        name="rsvp"
        method="post"
        netlify=""
        netifly-honeypot="non-human-name"
        onSubmit={onSubmission}
        css={css`
          display: flex;
          flex-direction: column;
          padding-bottom: 2rem;
          margin-top: auto;
          width: 100%;
        `}
      >
        <input type="hidden" name="form-name" value="rsvp" />
        <input
          css={css`
            display: none;
          `}
          name="non-human-name"
        />
        <div css={rowStyle}>
          <label htmlFor="name" css={labelStyle}>
            Name
          </label>
          <input
            id="name"
            css={inputStyle}
            required
            name="name"
            type="text"
            value={form.name}
            onChange={onInputChange}
          />
        </div>

        <fieldset css={fieldsetStyle}>
          <legend css={labelStyle}>I will be attending!</legend>
          <div>
            <Radio
              name="attending"
              value="Yes"
              onChange={onRadioChange}
              form={form}
            />
            <Radio
              name="attending"
              value="No"
              onChange={onRadioChange}
              form={form}
            />
          </div>
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
                : 'position: absolute; bottom: 0; pointer-events: none;'};
            `}
          >
            <div css={rowStyle}>
              <label htmlFor="food" css={labelStyle}>
                Food preferences
              </label>
              <input
                id="food"
                css={inputStyle}
                name="food"
                value={form.food}
                onChange={onInputChange}
                type="text"
              />
            </div>
            <fieldset css={fieldsetStyle}>
              <legend css={labelStyle}>Alcohol</legend>
              <Radio
                name="alcohol"
                value="Yes"
                onChange={onRadioChange}
                form={form}
                required={isAttending}
              />
              <Radio
                name="alcohol"
                value="No"
                onChange={onRadioChange}
                form={form}
                required={isAttending}
              />
            </fieldset>
          </animated.div>
        </animated.div>

        <Confetti
          active={formSubmitted}
          config={{ colors: confettiColors, elementCount: 60 }}
          css={css`
            transform: translateX(50%);
          `}
        />
        <Button disabled={!formValid} text={buttonText} />
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
