let component = ReasonReact.statelessComponent("Bird");

let wrapperStyle =
  Css.(
    style([
      position(`absolute),
      height(rem(7.)),
      left(rem(2.)),
      display(`flex),
      before([
        contentRule(""),
        position(`absolute),
        height(pct(100.)),
        borderRight(rem(0.05), solid, black),
        left(pct(47.5)),
        bottom(pct(25.)),
        zIndex(-1),
      ]),
    ])
  );

let imgStyle = Css.(style([maxWidth(rem(6.)), marginTop(`auto)]));

let poses =
  Posed.poses(
    ~hoverable=true,
    ~init=Posed.scalePose(~y="-100%", ()),
    ~hover=Posed.scalePose(~y="-20%", ()),
    ~full=
      Posed.scalePose(
        ~y="0%",
        ~transition=Posed.transitionType(~duration=500, ~type_="spring"),
        (),
      ),
    (),
  );

let make = _children => {
  ...component,

  render: _self => {
    let image = Assets.require("../images/bird.png");
    <Posed poses initialPose="init" pose="full" className=wrapperStyle>
      <img className=imgStyle src=image alt="Paper crane bird" />
    </Posed>;
  },
};