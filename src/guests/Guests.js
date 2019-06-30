/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import Person from './Person';
import PersonInfo from './PersonInfo';

export default function Guests() {
  const [persons, setPersons] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          '/.netlify/functions/fetchAttendingGuests',
          {
            method: 'GET',
          },
        );

        const json = await response.json();
        setPersons(
          json.map(({ data }) => data).filter(person => person.isAttending),
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1
        css={css`
          margin-left: 1rem;
        `}
      >
        Guests
      </h1>

      <div
        css={css`
          position: relative;
        `}
      >
        <div
          css={css`
            margin: 0 1rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, 160px);
            grid-auto-rows: 160px;
            grid-gap: 20px;
          `}
        >
          {persons.map(person => {
            return (
              <Person
                key={person.id}
                person={person}
                onClick={() => setExpanded(person)}
              />
            );
          })}
        </div>
        {expanded && (
          <PersonInfo person={expanded} onHide={() => setExpanded(null)} />
        )}
      </div>
    </div>
  );
}
