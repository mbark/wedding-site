let component = ReasonReact.statelessComponent("Bird");

let wrapperStyle =
  Css.(
    style([
      position(`absolute),
      height(rem(5.)),
      left(rem(3.)),
      display(`flex),
      before([
        contentRule(""),
        position(`absolute),
        height(pct(100.)),
        borderRight(rem(0.05), solid, black),
        left(pct(47.5)),
        bottom(px(20)),
        zIndex(-1),
      ]),
    ])
  );

let imgStyle = Css.(style([maxWidth(px(60)), marginTop(`auto)]));

let make = _children => {
  ...component,

  render: _self => {
    let image = Assets.require("../images/bird.png");
    <div className=wrapperStyle>
      <img className=imgStyle src=image alt="Paper crane bird" />
    </div>;
  },
};