Assets.requireCss("normalize.css");
let component = ReasonReact.statelessComponent("Root");

let rootStyle =
  Css.(
    style([
      display(`flex),
      justifyContent(`spaceBetween),
      flexDirection(`column),
      height(pct(100.)),
      overflowX(`hidden),
    ])
  );

let headerStyle =
  Css.(
    style([
      textTransform(uppercase),
      fontWeight(bolder),
      fontSize(rem(4.0)),
      lineHeight(em(0.9)),
      marginTop(`zero),
      marginBottom(`zero),
      wordSpacing(vw(100.)),
      fontFamily("Mont"),
      animationName(
        keyframes([
          (0, [transform(translateX(px(-50))), opacity(0.)]),
          (100, [transform(translateX(pct(0.))), opacity(1.)]),
        ]),
      ),
      animationDuration(500),
      animationFillMode(`both),
    ])
  );

let textStyle =
  Css.(
    style([
      display(`flex),
      flexDirection(column),
      marginLeft(rem(1.5)),
      marginTop(`auto),
      marginBottom(rem(6.)),
    ])
  );

let countdownStyle =
  Css.(
    style([
      animationName(
        keyframes([
          (0, [transform(translateY(px(-30))), opacity(0.)]),
          (100, [transform(translateY(pct(0.))), opacity(1.)]),
        ]),
      ),
      animationDuration(500),
      animationFillMode(`both),
      animationDelay(500),
    ])
  );

let make = _children => {
  ...component,

  render: _self => {
    <FullHeightDiv>
      <Bird />
      <div className=rootStyle>
        <Us />
        <div className=textStyle>
          <h1 className=headerStyle>
            {ReasonReact.string("We are getting married")}
          </h1>
          <div className=countdownStyle> <Countdown /> </div>
        </div>
      </div>
    </FullHeightDiv>;
  },
};