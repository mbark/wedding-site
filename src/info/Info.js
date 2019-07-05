/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import Map from './Map';
import Card from './Card';
import Guests from '../resources/images/guests.png';

export default function Info() {
  return (
    <div
      css={css`
        padding: 0 1rem;
      `}
    >
      <h1>Information</h1>

      <Card title="Day of the wedding">
        <dl
          css={css`
            display: grid;
            grid-template-columns: [time] auto [text] minmax(auto, 170px);
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
          <dt>4 PM</dt>
          <dd>Boat leaves for Ekensdal.</dd>

          <dt>5 PM</dt>
          <dd>Wedding ceremony</dd>

          <dt>5.30 PM</dt>
          <dd>Mingle and cake</dd>

          <dt>6.30 PM</dt>
          <dd>Dinner</dd>

          <dt>11 PM</dt>
          <dd>DANCE</dd>

          <dt>2 AM</dt>
          <dd>
            Bus leaves from Ekensdal to Brunkebergs torg (if you want to leave
            earlier (but why would you?) there will be taxis or you can also
            take public transportation)
          </dd>
        </dl>
      </Card>

      <Card title="Hosts and toasts">
        <div>
          <div
            css={css`
              display: grid;
              grid-template-columns: 50% 50%;
              grid-template-rows: auto;
              grid-template-areas:
                'cecilia ariel'
                'info info';
            `}
          >
            <div
              css={css`
                grid-area: cecilia;
                padding: 0 0.5rem;
                text-align: center;
              `}
            >
              <img
                src={Guests}
                css={css`
                  width: 100%;
                `}
                alt="Guests"
              />
              <h3
                css={css`
                  margin-block-end: 0;
                `}
              >
                Cecilia
              </h3>
            </div>
            <div
              css={css`
                grid-area: ariel;
                padding: 0 0.5rem;
                text-align: center;
              `}
            >
              <img
                src={Guests}
                css={css`
                  width: 100%;
                `}
                alt="Guests"
              />
              <h3
                css={css`
                  margin-block-end: 0;
                `}
              >
                Ariel
              </h3>
            </div>
            <p
              css={css`
                grid-area: info;
                margin-block-start: 0;
                margin-block-end: 0;
                padding: 1rem 0.5rem;
              `}
            >
              These are our lovely toastmasters who will make our dinner
              fabulous and epic! If you wish to hold a speech or do something
              else fun during the dinner. These are the guys you should talk to!
            </p>
          </div>

          <div
            css={css`
              display: grid;
              grid-template-columns: 50% 50%;
              grid-template-rows: auto;
              grid-template-areas:
                'cecilia ariel'
                'info info';
            `}
          >
            <div
              css={css`
                grid-area: cecilia;
                padding: 0 0.5rem;
                text-align: center;
              `}
            >
              <img
                src={Guests}
                css={css`
                  width: 100%;
                `}
                alt="Guests"
              />
              <h3
                css={css`
                  margin-block-end: 0;
                `}
              >
                Matilda
              </h3>
            </div>
            <div
              css={css`
                grid-area: ariel;
                padding: 0 0.5rem;
                text-align: center;
              `}
            >
              <img
                src={Guests}
                css={css`
                  width: 100%;
                `}
                alt="Guests"
              />
              <h3
                css={css`
                  margin-block-end: 0;
                `}
              >
                Gustav
              </h3>
            </div>
            <p
              css={css`
                grid-area: info;
                margin-block-start: 0;
                margin-block-end: 0;
                padding: 1rem 0.5rem;
              `}
            >
              Our hosts will make sure that you have all information you need
              and will help you will all questions up until the wedding. (they
              might help you later aswell)
            </p>
          </div>
        </div>
      </Card>

      <Card title="Gifts">
        <div>
          <p>
            We really don’t need more stuff but if you would like to give us a
            gift we would really appreciate a contribution to our honeymoon. We
            are going to Piemonte in northern Italy to drink wine and eat white
            truffle. Later we are going down do Cinque Terre to hike and swim in
            the ocean and our last days we will spend in Florence. What we are
            going to do there we don’t know yet...
          </p>
          <ul>
            <li>Renting bikes in Piemonte</li>
            <li>Wine tasting</li>
            <li>Hiking entrance in Piemonte</li>
            <li>Flight tickets</li>
            <li>Climate compensation for out flight</li>
            <li>Spending a night at a vineyard</li>
            <li>Truffles, truffles, truffles</li>
            <li>Hotel nights in Cinque Terre</li>
            <li>Luxury hotel night in Cinque Terre…</li>
            <li>Renting a car to drive around in Piemonte</li>
            <li>Trying dessert wine in Asti</li>
          </ul>
        </div>
      </Card>

      <Card title="Dresscode">
        <p>
          The dresscode is evening suit or in Swedish mörk kostym. However we
          are really encouraging smoking. The most important thing is that you
          feel that you look nice.
        </p>
      </Card>

      <Card title="Getting there">
        <div>
          <p>The boat will pick you up at Nybrokajen</p>
          <Map />
        </div>
      </Card>
    </div>
  );
}
