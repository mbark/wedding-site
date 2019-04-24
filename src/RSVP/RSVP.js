/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { useState } from 'react';
import Form from './Form';
import Attending from '../resources/images/attending.png';
import NotAttending from '../resources/images/not-attending.png';
import useFormal from '@kevinwolf/formal-web';
import * as yup from 'yup';
import { useTransition, animated } from 'react-spring';
import { setLocale } from 'yup';
import Button from './Button';
import LinkButton from './LinkButton';
import Confetti from 'react-dom-confetti';
import theme from '../theme';
import { useCookies } from 'react-cookie';

const confettiColors = Object.values(theme.colors);

setLocale({
  mixed: {
    required: 'Please fill out this field',
  },
});

const schema = yup.object().shape({
  name: yup.string().required(),
  attending: yup.string().required(),
  food: yup.string(),
  alcohol: yup
    .string()
    .nullable()
    .when('attending', {
      is: 'Yes',
      then: yup.string().required(),
    }),
  extra: yup.string(),
  'non-human-input': yup.string(),
});

const initialValues = {
  name: '',
  attending: null,
  food: '',
  alcohol: null,
  'non-human-input': '',
};

const cookieName = 'rsvpInformation';

export default function RSVP() {
  const [showConfetti, displayConfetti] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);
  const rsvpInformation = cookies[cookieName];

  const removeHasRSVPed = () => removeCookie(cookieName);

  const formal = useFormal(initialValues, {
    schema,
    onSubmit: values => {
      const formData = Object.keys(values).reduce((formData, key) => {
        formData.append(key, values[key]);
        return formData;
      }, new FormData());
      formData.append('form-name', 'rsvp');

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      })
        .then(() => formal.reset())
        .then(() => setCookie(cookieName, formal.values))
        .then(() => displayConfetti(formal.values.attending === 'Yes'))
        .catch(error => console.error(error));
    },
  });

  const hasRSVPed = !!rsvpInformation;
  const isAttending =
    (hasRSVPed ? rsvpInformation.attending : formal.values.attending) === 'Yes';

  const transitions = useTransition(rsvpInformation, null, {
    from: {
      opacity: 0,
      transform: `translate3d(0,50%,0)`,
      position: 'absolute',
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0%,0,0)',
      position: 'inherit',
    },
    leave: {
      opacity: 0,
      transform: `translate3d(0,10%,0)`,
      position: 'absolute',
    },
  });

  let buttonText = 'Sign me up baby!';
  if (formal.isDirty && !isAttending) {
    buttonText = 'See you another time?';
  }

  if (hasRSVPed) {
    if (isAttending) {
      buttonText = 'See who else is attending!';
    } else {
      buttonText = 'Wanna see who is attending?';
    }
  }

  return (
    <div
      css={css`
        margin: 0 1.5rem;
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <h1>RSVP</h1>
      <form
        method="post"
        {...formal.getFormProps()}
        css={css`
          display: flex;
          flex-direction: column;
          padding-bottom: 2rem;
          height: 100%;
          width: 100%;
        `}
      >
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            {item ? (
              <img
                src={item.attending === 'Yes' ? Attending : NotAttending}
                alt=""
                css={css`
                  width: 12rem;
                  height: 12rem;
                  margin-bottom: 1rem;
                `}
              />
            ) : (
              <Form
                key={key}
                style={props}
                formal={formal}
                isAttending={isAttending}
              />
            )}
          </animated.div>
        ))}

        <Confetti
          active={showConfetti}
          config={{ colors: confettiColors, elementCount: 60 }}
          css={css`
            position: absolute;
            transform: translateX(50%);
          `}
        />
        <Button formal={formal} text={buttonText} isSubmitted={hasRSVPed} />
        {hasRSVPed && (
          <LinkButton type="button" onClick={() => removeHasRSVPed()}>
            RSVP for someone else
          </LinkButton>
        )}
      </form>
    </div>
  );
}
