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
      marginBottom(rem(0.50)),
      wordSpacing(vw(100.)),
      fontFamily("Mont"),
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

let countdownPoses =
  Posed.(
    poses(
      ~init=poseT(~y="-20%", ~opacity=0., ()),
      ~idle=
        poseT(
          ~y="0",
          ~opacity=1.,
          ~delay=600,
          ~transition=Posed.transitionT(~duration=500, ()),
          (),
        ),
      (),
    )
  );

let make = _children => {
  ...component,

  render: _self => {
    <FullHeightDiv>
      <Bird />
      <div className=rootStyle>
        <Us />
        <Posed
          element=Posed.div
          initialPose="init"
          pose="idle"
          poses=countdownPoses
          className=textStyle>
          <h1 className=headerStyle>
            {ReasonReact.string("We are getting married")}
          </h1>
          <Countdown />
        </Posed>
      </div>
    </FullHeightDiv>;
  },
};