/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";
import css from "@emotion/css/macro";
import Countdown from "./Countdown";

const animation = keyframes`
    from, 0% {
      transform: translateX(-50px);
      opacity: 0;
    }

    to, 100% {
      transform: translateX(0);
      opacity: 1;
    }
  `;

export default function Frontpage() {
  return (
    <div>
      <h1
        css={css`
          margin-top: 0;
          margin-bottom: 0;
          word-spacing: 100vw;
          font-size: 4rem;
          animation-name: ${animation};
          animation-duration: 0.5s;
          animation-fill-mode: both;
        `}
      >
        We are getting married
      </h1>
      <Countdown />
    </div>
  );
}
