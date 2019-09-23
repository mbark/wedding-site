/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import React, { useState } from 'react';
import Map from './Map';
import Card from './Card';
import Hosts from '../resources/images/hosts.png';
import Party from '../resources/images/party.png';

export default function Day() {
  const ekensdal = { lat: 59.33266, lng: 18.204639 };
  const nybrokajen = { lat: 59.332387, lng: 18.076871 };
  const [mapProps, setMapProps] = useState(null);

  const TimePoint = ({ time, title, location, info, mapProps }) => (
    <React.Fragment>
      <dt>
        <div
          css={css`
            font-weight: bold;
          `}
        >
          {time}
        </div>
        {location && !mapProps && (
          <span
            css={css`
              font-size: 0.9em;
            `}
          >
            {location}
          </span>
        )}
        {location && mapProps && (
          <div
            onClick={() => setMapProps(mapProps)}
            css={({ colors }) => css`
              cursor: pointer;

              &:hover {
                color: ${colors.red.mix(colors.peach, 0.4).string()};
              }
            `}
          >
            <span
              css={css`
                text-decoration: underline;
                font-size: 0.9em;
              `}
            >
              {location}
            </span>
          </div>
        )}
      </dt>
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
      <Map
        show={!!mapProps}
        onHide={() => setMapProps(null)}
        {...(mapProps ? mapProps : {})}
      />

      <dl
        css={css`
          display: grid;
          grid-template-columns: [time] auto [text] auto;
          grid-auto-rows: auto;
          grid-row-gap: 1.5rem;
          grid-column-gap: 1rem;

          & > dt {
            text-align: right;
            grid-column: time;
          }

          & > dd {
            grid-column: text;
            margin-inline-start: 0;
          }
        `}
      >
        <TimePoint
          time="16:00"
          location="Nybrokajen"
          mapProps={{
            location: nybrokajen,
            markerImg: Hosts,
            markerTitle: 'Gustav och Matilda',
          }}
          title="The boat leaves for Ekensdal"
          info={`
          Our hosts, Matilda and Gustav, will meet you by the boat.
          The boat departs at 16:00 sharp, so be on time!`}
        />

        <TimePoint
          time="17:00"
          title="Wedding ceremony"
          location="On the boat"
          info="Cava and canapés will be served."
        />

        <TimePoint
          time="17:30"
          location="Ekensdal"
          mapProps={{
            location: ekensdal,
            markerImg: Party,
            markerTitle: 'Party',
          }}
          title="Mingle and cake"
          info="Mingle around, eat wedding cake and drink Gin and Tonic."
        />

        <TimePoint
          time="18:30"
          title="Dinner"
          info="The dinner starts at Ekensdal."
        />

        <TimePoint time="23:00" title="Dance" info="Dance, drink and talk!" />

        <TimePoint
          time="02:00"
          title="The bus leaves from Ekensdal"
          info="The bus will go to Brunkebergs torg. If you want to leave earlier there is public transportation or taxis."
        />
      </dl>
    </Card>
  );
}
