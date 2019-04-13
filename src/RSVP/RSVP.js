/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { useState } from 'react';
import Form from './Form';
import Attending from '../resources/images/attending.png';
import useFormal from '@kevinwolf/formal-web';
import * as yup from 'yup';
import { setLocale } from 'yup';
import Button from './Button';
import Confetti from 'react-dom-confetti';
import theme from '../theme';

const confettiColors = Object.values(theme.colors);

setLocale({
  mixed: {
    required: 'Please fill out this field',
  },
});

const schema = yup.object().shape({
  name: yup.string().required(),
  attending: yup.boolean().required(),
  food: yup.string(),
  alcohol: yup.boolean().when('attending', {
    is: true,
    then: yup.boolean().required(),
  }),
  'non-human-input': yup.string(),
});

const initialValues = {
  name: '',
  attending: false,
  food: '',
  alcohol: false,
  'non-human-input': '',
};

export default function RSVP() {
  const [showConfetti, displayConfetti] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
        .then(() => setFormSubmitted(true))
        .then(() => displayConfetti(formal.values.attending))
        .catch(error => console.error(error));
    },
  });

  const buttonText = formal.values.attending
    ? 'Sign me up baby!'
    : 'See you another time?';

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

          & label {
            font-family: 'Mont';
          }
        `}
      >
        {formSubmitted ? (
          <img
            src={Attending}
            alt=""
            css={css`
              width: 12rem;
              height: 12rem;
            `}
          />
        ) : (
          <Form formal={formal} />
        )}

        <Confetti
          active={showConfetti}
          config={{ colors: confettiColors, elementCount: 60 }}
          css={css`
            transform: translateX(50%);
          `}
        />
        <Button formal={formal} text={buttonText} />
      </form>
    </div>
  );
}
