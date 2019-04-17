/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import Person from './Person';

export default function Guests() {
  return (
    <div css={css``}>
      <h1
        css={css`
          margin-left: 1rem;
        `}
      >
        Guests
      </h1>
      <div
        css={css`
          width: 100vw;
          display: grid;
          grid-template-columns: auto [first] 160px 20px [second] 160px auto;
          grid-template-rows: 230px 20px;
        `}
      >
        <Person imgPrefix="martin" name="Martin Barksten" start="first" />
        <Person imgPrefix="berit" name="Berit Zöllner Wohlfart" start="second" />
        {/* <Person name="berit" /> */}
        {/* <Person name="berit" /> */}
        {/* <Person name="berit" /> */}
      </div>
    </div>
  );
}
