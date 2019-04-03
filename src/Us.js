/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import { animated, useSpring } from "react-spring";
import UsImage from "./resources/images/us.png";

export default function Us() {
  const [props, set, stop] = useSpring(() => ({
    opacity: 0,
    transform: "scale(0)",
    config: { mass: 1, tension: 200, friction: 15 }
  }));

  const textProps = useSpring({
    from: {
      transform: "translateY(-30px)",
      opacity: 0
    },
    to: {
      transform: "translateY(0)",
      opacity: 1
    },
    delay: 500,
    config: { mass: 1, tension: 200, friction: 15 }
  });

  return (
    <div
      css={css`
        margin-left: auto;
        margin-right: 1rem;
        position: absolute;
        top: 0;
        right: 0;
      `}
    >
      <animated.img
        src={UsImage}
        alt=""
        onLoad={() => {
          set({ opacity: 1, transform: "scale(1)" });
        }}
        style={props}
        css={css`
          width: 10rem;
          height: 10rem;
        `}
      />
      <animated.div
        style={textProps}
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <h2
          css={css`
            margin-bottom: 0;
            margin-top: 0;
            font-size: 1.2rem;
          `}
        >
          Martin & Lisa
        </h2>
        <p
          css={css`
            font-size: 0.6rem;
            margin: 0;
          `}
        >
          September 28
        </p>
      </animated.div>
    </div>
  );
}
