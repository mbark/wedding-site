/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import React from 'react';
import Map from './Map';
import Card from './Card';

export default function Day() {
  const TimePoint = ({ time, title, info }) => (
    <React.Fragment>
      <dt>{time}</dt>
      <dd>
        <h4
          css={css`
            margin-bottom: 0.3rem;
          `}
        >
          {title}
        </h4>
        <div
          css={css`
            font-size: 0.8em;
          `}
        >
          {info}
        </div>
      </dd>
    </React.Fragment>
  );
  return (
    <Card title="Day of the wedding">
      <Map />

      <dl
        css={css`
          display: grid;
          grid-template-columns: [time] auto [text] auto;
          grid-auto-rows: auto;
          grid-row-gap: 1rem;
          grid-column-gap: 0.5rem;

          & > dt {
            text-align: right;
            grid-column: time;
            font-weight: bold;
          }

          & > dd {
            grid-column: text;
            margin-inline-start: 0;
          }
        `}
      >
        <TimePoint
          time="4 PM"
          title="Boat leaves for Ekensdal"
          info={`
          Our hosts, Matilda and Gustav, will meet you by the boat.
          The boat departs at 4 PM sharp, so be there!
          The exact location on Nybrokajen will be added when we ourselves know.`}
        />

        <TimePoint
          time="5 PM"
          title="Wedding ceremony"
          info="There will be canapés to eat and cava to drink at the boat."
        />

        <TimePoint
          time="5.30 PM"
          title="Mingle and cake"
          info="Mingle around, eat wedding cake and drink Gin and Tonic."
        />

        <TimePoint
          time="6.30 PM"
          title="Dinner"
          info="The dinner starts at Ekensdal."
        />

        <TimePoint time="11 PM" title="Dance" info="Dance, drink and talk!" />

        <TimePoint
          time="2 AM"
          title="Bus leaves from Ekensdal"
          info="
        The bus will go to Brunkebergs torg. If you want to leave earlier
        there is public transporation or taxis."
        />
      </dl>
    </Card>
  );
}
