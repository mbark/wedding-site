/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import Day from './Day';
import HostToast from './HostToast';
import Card from './Card';
import { Image, Transformation } from 'cloudinary-react';
import { usePhoneQuery } from '../guests/Person';

export default function Info() {
  const isPhone = usePhoneQuery();
  const imageSize = isPhone ? 120 : 180;

  const Emoji = ({ emoji, label }) => (
    <span role="img" aria-label={label}>
      {emoji}
    </span>
  );

  return (
    <div
      css={css`
        padding: 0 1rem;
      `}
    >
      <h1>Info</h1>

      <Day />

      <HostToast />

      <Card title="Gifts">
        <div>
          <p>
            We really don’t need more stuff but if you would like to give us a
            gift we would really appreciate a contribution to our honeymoon.
          </p>

          <p>
            We are going to Piemonte in northern Italy to eat white truffle,
            drink wine and enjoy the nature. Later we are going down do Cinque
            Terre to hike and swim in the ocean and our last days will be spent
            in Florence.
          </p>

          <p>Here are some of things you can improve on our honeymoon.</p>
          <ul
            css={css`
              list-style-type: none;
              padding-inline-start: 0;
              font-size: 1.1em;

              & > li {
                padding: 0.2rem;
              }
            `}
          >
            <li>
              <Emoji emoji="🚴‍♀" label="bike" /> Renting better bikes in
              Piemonte
            </li>
            <li>
              <Emoji emoji="🍷" label="wine" /> More wines to taste
            </li>
            <li>
              <Emoji emoji="🍇" label="grape" /> More luxurious vineyard to
              spend the night at
            </li>
            <li>
              <Emoji emoji="🍄" label="truffle" /> Truffles, truffles and more
              truffles
            </li>
            <li>
              <Emoji emoji="🏩" label="hotel" /> Luxury hotel night in Cinque
              Terre…
            </li>
            <li>
              <Emoji emoji="🍾" label="wine bottle" /> More dessert wine in Asti
            </li>
            <li>
              <Emoji emoji="🌱" label="plant" /> Climate compensation for our
              flight
            </li>
            <li>
              <Emoji emoji="🧞‍♂️" label="genius" /> Or something else you think we
              should do!
            </li>
          </ul>
        </div>
      </Card>

      <Card title="Dress code">
        <div
          css={css`
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: auto;
            grid-template-areas:
              'info info'
              'ladies men'
              'ladies men';
          `}
        >
          <div
            css={css`
              grid-area: info;
            `}
          >
            <p>
              The formal dress code is evening suit, in Sweden called{' '}
              <i>"mörk kostym"</i>.
            </p>
            <p>
              Not feeling like wearing what the formal dress code dictates?
              That's all good, as long as you feel you look good you can come in
              whatever you like!
            </p>
          </div>

          <div
            css={css`
              grid-area: ladies;
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <Image
              publicId={`lisa-default`}
              width={imageSize}
              height={imageSize}
            >
              <Transformation quality="auto" fetchFormat="auto" />
            </Image>
            <p>
              For ladies evening suit traditionally means a dress or skirt in a
              cloth like silk or velvet.
            </p>
          </div>

          <div
            css={css`
              grid-area: men;
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <Image
              publicId={`martin-barksten-default`}
              width={imageSize}
              height={imageSize}
            >
              <Transformation quality="auto" fetchFormat="auto" />
            </Image>
            <p>
              For men evening suit traditionally means a dark costume. However,
              if you have a smoking or have been looking for that time to invest
              in one -- we encourage you to bring one!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
