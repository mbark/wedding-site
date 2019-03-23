let component = ReasonReact.statelessComponent("Frontpage");
let make = _children => {
  ...component,

  render: _self => {
    let headerStyle =
      Css.(
        merge([
          style([
            marginTop(`zero),
            marginBottom(`zero),
            wordSpacing(vw(100.)),
            fontSize(rem(4.0))
          ]),
          Styles.headerAnimation,
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

    <div className=textStyle>
      <h1 className=headerStyle>
        {ReasonReact.string("We are getting married")}
      </h1>
      <div className=countdownStyle> <Countdown /> </div>
    </div>;
  },
};