/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { useEffect, useRef, useState } from 'react';
import { animated, useSpring, config } from 'react-spring';
import ResizeObserver from 'resize-observer-polyfill';

export default function RSVP() {
  const [form, setForm] = useState({
    name: '',
    attending: null,
    food: '',
    alcohol: null,
  });
  const attending = form.attending === 'Yes';

  const previous = usePrevious(attending);
  const [bind, { height: viewHeight }] = useMeasure();
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(-10%,0,0)' },
    to: {
      opacity: attending ? 1 : 0,
      height: attending ? viewHeight : 0,
      transform: `translate3d(${attending ? 0 : '10%'},0,0)`,
    },
    config: config.gentle,
  });

  const validateForm = () => {
    let valid = true;
    valid = valid && !!form.name;
    valid = valid && typeof form.attending === 'string';
    if (form.attending) {
      valid = valid && typeof form.alcohol === 'string';
    }

    return valid;
  };

  const formValid = validateForm();

  let buttonText = 'Fill out required fields to sign up!';
  if (formValid) {
    buttonText = form.attending ? 'Sign me up baby!' : 'See you another time?';
  }

  const toggle = (name, value) => {
    const id = `${name}-${value}`;
    const toggleStyle = css`
      height: 0;
      width: 0;
      position: absolute;
      opacity: 0;
      bottom: 0;
      left: 0.3rem;
      &:checked + label {
        background-color: #700f00;
      }
      &:focus + label {
        border-color: #700f00;
      }
      & + label {
        cursor: pointer;
        text-indent: -9999px;
        width: 0.6em;
        height: 0.6em;
        border: 3px solid rgba(112, 15, 0, 0.2);
        display: inline-block;
        border-radius: 0.6em;
        position: relative;
        transition: all 0.2s;
        &:hover {
          border-color: #700f00;
        }
      }
    `;

    return (
      <div
        css={css`
          margin-right: 1rem;
          display: inline-flex;
          align-items: center;
          position: relative;
        `}
      >
        <input
          required
          type="radio"
          id={id}
          name={name}
          value={value}
          css={toggleStyle}
          checked={value === form[name]}
          onChange={onRadioChange(value)}
        />
        <label htmlFor={id} />
        <label htmlFor={id}>{value}</label>
      </div>
    );
  };

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

  const [buttonSpring, setButtonSpring] = useSpring(() => ({
    transform: 'scale(1)',
    config: {
      mass: 1,
      tension: 300,
      friction: 15,
      velocity: 10,
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
    &:disabled {
      cursor: not-allowed;
      background-color: rgba(112, 15, 0, 0.5);
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

  return (
    <div>
      <h1>RSVP</h1>
      <form
        name="rsvp"
        method="post"
        netlify=""
        netifly-honeypot="non-human-name"
        css={css`
          display: flex;
          flex-direction: column;
          padding-bottom: 2rem;
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
          <label css={labelStyle}>Name</label>
          <input
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
            {toggle('attending', 'Yes')}
            {toggle('attending', 'No')}
          </div>
        </fieldset>

        <animated.div
          css={css`
            position: relative;
          `}
          style={{
            opacity,
            height: attending && previous === attending ? 'auto' : height,
          }}
        >
          <animated.div
            style={{ transform }}
            {...bind}
            css={css`
              ${attending
                ? ''
                : 'position: absolute; bottom: 0; pointer-events: none;'};
            `}
          >
            <div css={rowStyle}>
              <label css={labelStyle}>Food preferences</label>
              <input
                css={inputStyle}
                name="food"
                value={form.food}
                onChange={onInputChange}
                type="text"
              />
            </div>
            <fieldset css={fieldsetStyle}>
              <legend css={labelStyle}>Alcohol</legend>
              {toggle('alcohol', 'Yes', {})}
              {toggle('alcohol', 'No', {})}
            </fieldset>
          </animated.div>
        </animated.div>

        <animated.button
          css={buttonStyle}
          style={buttonSpring}
          disabled={!formValid}
          onMouseOver={() => setButtonSpring({ transform: 'scale(1.1)' })}
          onMouseLeave={() => setButtonSpring({ transform: 'scale(1)' })}
          onClick={() => setButtonSpring({ transform: 'scale(1.0)' })}
          name="sign-up"
          type="submit"
        >
          {buttonText}
        </animated.button>
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
