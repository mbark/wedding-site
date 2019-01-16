Assets.requireCss("normalize.css");

let component = ReasonReact.statelessComponent("Root");

let rootStyle =
  Css.(
    style([
      display(`flex),
      justifyContent(spaceBetween),
      height(vh(100.0)),
      flexWrap(wrapReverse)
    ])
  );

let headerStyle =
  Css.(
    style([
      textTransform(uppercase),
      fontWeight(bolder),
      marginTop(auto),
      wordSpacing(vw(100.0)),
      fontSize(rem(7.0)),
      lineHeight(em(0.9)),
      marginBottom(rem(0.50)),
    ])
  );

let textStyle = Css.(style([
    display(`flex),
    flexDirection(column),
    marginLeft(rem(6.0)),
    marginBottom(rem(3.0)),
    flexBasis(pct(60.0)),
]));

let make = _children => {
  ...component,

  render: _self => { 
    <div className=rootStyle>
      <div className=textStyle>
        <Bird />
        <h1 className=headerStyle>
          {ReasonReact.string("We are getting married.")}
        </h1>
        <Countdown />
      </div>
      <Us />
    </div>;
  },
};