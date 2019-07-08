/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import Card from './Card';
import Person from '../guests/Person';

export default function HostToast() {
  const hostToast = {
    matilda: {
      id: 'matilda-marin',
      name: 'Matilda Marin',
      mailto: 'host',
    },
    gustav: {
      id: 'gustav-marin',
      name: 'Gustav Marn',
      mailto: 'host',
    },
    cecilia: {
      id: 'cecilia-molinder',
      name: 'Cecilia Molinder',
      mailto: 'toast',
    },
    ariel: {
      id: 'ariel-blomqvist',
      name: 'Ariel Blomqvist',
      mailto: 'toast',
    },
  };

  const PersonPicture = ({ name }) => (
    <div
      css={css`
        grid-area: ${name};
        padding: 0 0.5rem;
        text-align: center;
      `}
    >
      <Person
        person={hostToast[name]}
        isExpanded={false}
        onClick={() => {
          window.location.href = `mailto:${
            hostToast[name].mailto
          }@lisamartin.wedding`;
        }}
      />
    </div>
  );

  const Grid = ({ name1, name2, mail, children }) => (
    <div
      css={css`
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: auto;
        grid-template-areas:
          '${name1} ${name2}'
          'info info';

        &:not(:last-child) { 
          margin-bottom: 1.5rem;
        }
      `}
    >
      <PersonPicture name={name1} />
      <PersonPicture name={name2} />
      <p
        css={css`
          grid-area: info;
          margin-block-start: 0;
          margin-block-end: 0;
          padding: 1rem 0.5rem;
        `}
      >
        {children}
        <a
          css={theme => css`
            display: block;
            color: ${theme.colors.darkGreen.string()};
            font-weight: bold;
            margin-top: 4px;
          `}
          href={`mailto:${mail}@lisamartin.wedding`}
        >
          {mail}@lisamartin.wedding
        </a>
      </p>
    </div>
  );

  return (
    <Card title="Hosts and toasts">
      <Grid name1="matilda" name2="gustav" mail="hosts">
        These are our incredible hosts who will ensure you have all the
        information you need up until the dinner starts. If you have questions
        direct it to them.
      </Grid>

      <Grid name1="cecilia" name2="ariel" mail="toasts">
        These are our lovely toastmasters who will ensure an epic and fabolous
        dinner! If you wish to hold a speech or do something else fun during the
        dinner get in touch with them.
      </Grid>
    </Card>
  );
}
