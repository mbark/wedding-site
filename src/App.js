/** @jsx jsx */
import { Global, jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import 'normalize.css';
import Div100vh from 'react-div-100vh';
import { BrowserRouter } from 'react-router-dom';
import Bird from './Bird';
import MontEot from './resources/fonts/MontDemo-Heavy.eot';
import MontOtf from './resources/fonts/MontDemo-Heavy.otf';
import MontWoff from './resources/fonts/MontDemo-Heavy.woff';
import MontWoff2 from './resources/fonts/MontDemo-Heavy.woff2';
import Us from './Us';
import Navbar from './Navbar';
import Main from './Main';

export default function App() {
  return (
    <Div100vh
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        max-height: 100vh;

        @media (min-width: 1025px) {
          min-height: 780px;
        }
      `}
    >
      <BrowserRouter>
        <Global
          styles={css` 
            @font-face {
              font-family: "Mont";
              src: url("${MontEot}");
              src: url("${MontOtf}");
              src: url("${MontWoff}");
              src: url("${MontWoff2}");
            }

          html { 
            font-size: 100%; 

            @media (min-width: 768px) and (max-width: 1024px) {
              font-size: 140%;
            } 
            @media (min-width: 1025px) {
              font-size: 160%;
            }
          }

        body {
          background-color: #F2D6CC;
          color: #700F00;
          font-family: 'Open Sans';
        }

        h1, h2, h3, h4, h5 {
          font-family: "Mont";
          margin-top: 0;
        }

        h1 {
          text-transform: uppercase;
          font-size: 4rem;
          line-height: 0.9em;
        }
       
        h4 {
          text-transform: uppercase;
        }
        `}
        />
        <div
          css={css`
            position: relative;
            height: 100%;

            @media (min-width: 768px) {
              margin-top: 80px;
            }
          `}
        >
          <Bird />
          <Us />
          <Main />
        </div>
        <Navbar />
      </BrowserRouter>
    </Div100vh>
  );
}
