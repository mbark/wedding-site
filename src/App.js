/** @jsx jsx */
import { Global, jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import "normalize.css";
import Div100vh from "react-div-100vh";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Bird from "./Bird";
import Frontpage from "./Frontpage";
import MontEot from "./resources/fonts/MontDemo-Heavy.eot";
import MontOtf from "./resources/fonts/MontDemo-Heavy.otf";
import MontWoff from "./resources/fonts/MontDemo-Heavy.woff";
import MontWoff2 from "./resources/fonts/MontDemo-Heavy.woff2";
import RSVP from "./RSVP";
import Us from "./Us";


export default function App() {
  return (
    <Div100vh
      css={css`
        display: flex;
        @media (min-width: 1025px) {
          min-height: 780px;
        }
      `}
    >
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
        }

        h1 {
          text-transform: uppercase;
          line-height: 0.9em;
        }`}
      />
      <Bird />
      <Us />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-left: 1.5rem;
          margin-top: auto;
          margin-bottom: 6rem;
        `}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={Frontpage} />
            <Route path="/rsvp" component={RSVP} />
            <Route component={Frontpage} />
          </Switch>
        </Router>
      </div>
    </Div100vh>
  );
}
