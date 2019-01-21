Assets.requireCss("normalize.css");

let component = ReasonReact.statelessComponent("Root");

let rootStyle =
  Css.(
    style([
      display(`flex),
      justifyContent(`spaceBetween),
      flexDirection(`column),
      height(pct(100.)),
    ])
  );

let headerStyle =
  Css.(
    style([
      textTransform(uppercase),
      fontWeight(bolder),
      wordSpacing(vw(100.0)),
      fontSize(rem(4.0)),
      lineHeight(em(0.9)),
      marginTop(`zero),
      marginBottom(rem(0.50)),
    ])
  );

let textStyle =
  Css.(
    style([
      display(`flex),
      flexDirection(column),
      marginLeft(rem(1.8)),
      marginTop(`auto),
      marginBottom(rem(6.)),
    ])
  );

let gettingStyle = Css.(style([position(`relative)]));

let make = _children => {
  ...component,

  render: _self => {
    <FullHeightDiv>
      <div className=rootStyle>
        <Us />
        <div className=textStyle>
          <Bird />
          <h1 className=headerStyle>
            {ReasonReact.string("We are getting married")}
          </h1>
          <Countdown />
        </div>
      </div>
    </FullHeightDiv>;
  },
};