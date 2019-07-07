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
        const persons = json.map(({ data }) => data);

        console.log(persons);

        const isUs = ({ id }) => id === 'martin-barksten' || id === 'lisa';
        const us = persons.filter(isUs);

        const guests = persons
          .filter(person => !isUs(person))
          .sort((person1, person2) => {
            if (person1.name < person2.name) {
              return -1;
            }

            if (person1.name > person2.name) {
              return 1;
            }

            return 0;
          });

        guests.unshift(...us);

        setPersons(guests);
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
          {persons.map(person => (
            <Person
              key={person.id}
              person={person}
              isExpanded={expanded && expanded.id === person.id}
              onClick={() => setExpanded(person)}
            />
          ))}
        </div>
        <PersonInfo person={expanded} onHide={() => setExpanded(null)} />
      </div>
    </div>
  );
}
