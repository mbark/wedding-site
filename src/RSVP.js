/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import { useEffect, useRef, useState } from "react";
import { animated, useSpring, config } from "react-spring";
import ResizeObserver from "resize-observer-polyfill";

export default function RSVP() {
  const [attending, setAttending] = useState(false);

  const previous = usePrevious(attending);
  const [bind, { height: viewHeight }] = useMeasure();
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: "translate3d(-10%,0,0)" },
    to: async (next, cancel) => {
      await next({
        transform: `translate3d(${attending ? 0 : "-10%"},0,0)`,
        opacity: attending ? 1 : 0
      });
      await next({
        height: attending ? viewHeight : 0
      });
    },
    config: config.gentle
  });

  const toggle = (name, value, props) => {
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
          {...props}
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

  const buttonStyle = css`
    padding: 0.5rem 1.5rem;
    position: relative;
    background-color: rgb(112, 15, 0);
    color: white;
    border-style: none;
    width: max-content;
    font-family: "Mont";
    border-radius: 8px;
    box-shadow: 4px 4px 1px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition: all 0.2s;
    &::after {
      content: "";
      border-radius: 8px;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: 8px 4px 2px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transition: all 0.2s;
    }

    &:hover {
      transform: scale(1.1);
      &::after {
        opacity: 1;
      }

      &:active {
        transform: scale(0.95);
        &::after {
          opacity: 0;
        }
      }
    }
  `;

  const labelStyle = css`
    font-family: "Mont";
    display: block;
  `;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        margin-left: 1.5rem;
        height: 100%;
      `}
    >
      <h1
        css={css`
          align-self: flex-start;
          margin-top: 0;
          margin-bottom: 2rem;
        `}
      >
        RSVP
      </h1>
      <form
        name="rsvp"
        method="post"
        netlify=""
        netifly-honeypot="non-human-name"
        css={css`
          display: flex;
          flex-direction: column;
          padding-bottom: 2rem;
          padding-right: 2rem;
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
          <input css={inputStyle} required name="name" type="text" />
        </div>

        <fieldset css={fieldsetStyle}>
          <legend css={labelStyle}>I will be attending!</legend>
          <div>
            {toggle("attending", "Yes", {
              onChange: () => setAttending(true)
            })}
            {toggle("attending", "No", {
              onChange: () => setAttending(false)
            })}
          </div>
        </fieldset>

        <animated.div
          style={{
            opacity,
            height: attending && previous === attending ? "auto" : height
          }}
        >
          <animated.div style={{ transform }} {...bind}>
            <div css={rowStyle}>
              <label css={labelStyle}>Food preferences</label>
              <input css={inputStyle} name="food-preferences" type="text" />
            </div>
            <fieldset css={fieldsetStyle}>
              <legend css={labelStyle}>Alcohol</legend>
              {toggle("alcohol", "Yes", {})}
              {toggle("alcohol", "No", {})}
            </fieldset>
          </animated.div>
        </animated.div>

        <button css={buttonStyle} name="sign-up" type="submit">
          {attending ? "Sign me up baby!" : "See you another time?"}
        </button>
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
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );
  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [{ ref }, bounds];
}
