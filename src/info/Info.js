/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import Map from './Map';

export default function Info() {
  return (
    <div
      css={css`
        padding: 0 1rem;
      `}
    >
      <h1>Information</h1> <h2>Getting there</h2>
      <p>The boat will pick you up at Nybrokajen</p>
      <Map />
    </div>
  );
}
