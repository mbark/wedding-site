/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import { useSpring, animated } from "react-spring";
import BirdImage from "./resources/images/bird.png";

export default function Bird() {
  const animateTo = {
    transform: "translateY(0)",
    opacity: 1
  };

  const [props, set] = useSpring(() => ({
    transform: "translateY(-100%)",
    opacity: 0,
    config: { mass: 2, tension: 200, friction: 20 }
  }));

  return (
    <animated.div
      style={props}
      css={css`
        position: fixed;
        height: 7rem;
        left: 2rem;
        display: flex;
        z-index: -1;
        &:before {
          content: "";
          position: absolute;
          height: 100%;
          border-right: 0.05rem solid black;
          left: 47.5%;
          bottom: 25%;
          z-index: -1;
        }
      `}
    >
      <img
        css={css`
          width: 6rem;
          margin-top: auto;
        `}
        src={BirdImage}
        alt=""
        onLoad={() => set(animateTo)}
      />
    </animated.div>
  );
}
