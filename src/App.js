/** @jsx jsx */
import { Global, jsx } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import css from '@emotion/css/macro';
import 'normalize.css';
import { BrowserRouter } from 'react-router-dom';
import Bird from './Bird';
import MontEot from './resources/fonts/MontDemo-Heavy.eot';
import MontOtf from './resources/fonts/MontDemo-Heavy.otf';
import MontWoff from './resources/fonts/MontDemo-Heavy.woff';
import MontWoff2 from './resources/fonts/MontDemo-Heavy.woff2';
import Us from './Us';
import Navbar, { navbarHeight } from './Navbar';
import Main from './Main';
import theme from './theme';

export default function App() {
  return (
    <div
      css={css`
        height: 100vh;

        @media (min-width: 1025px) {
          min-height: 780px;
        }
      `}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Global
            styles={theme => css` 
            @font-face {
              font-family: "Mont";
              src: url("${MontEot}");
              src: url("${MontOtf}");
              src: url("${MontWoff}");
              src: url("${MontWoff2}");
            }

            * {
              box-sizing: border-box;
            }

            html { 
              font-size: 100%; 

              @media (min-width: ${theme.media.phone}px) and (max-width: ${theme.media.tablet}px) {
                font-size: 140%;
              } 

              @media (min-width: ${theme.media.tablet + 1}px) {
                font-size: 160%;
              }
            }

            body {
              background-color: #F2D6CC;
              color: ${theme.colors.red};
              font-family: 'Open Sans';
            }

            h1, h2, h3, h4, h5 {
              font-family: "Mont";
              margin-top: 0;
            }

            h1 {
              text-transform: uppercase;
              font-size: 3rem;
              line-height: 0.9em;
            }
          
            h4 {
              text-transform: uppercase;
            }
        `}
          />
          <div
            css={theme => css`
              position: relative;
              display: flex;
              flex-direction: column;
              padding-bottom: ${navbarHeight};

              @media (min-width: ${theme.media.phone}px) {
                margin-top: ${navbarHeight};
                padding-bottom: 0;
              }
            `}
          >
            <Bird />
            <Us />
            <Main />
          </div>
          <Navbar />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
