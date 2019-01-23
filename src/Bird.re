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

let make = _children => {
  ...component,

  render: _self => {
    let image = Assets.require("../images/bird.png");
    <div className=wrapperStyle>
      <img className=imgStyle src=image alt="Paper crane bird" />
    </div>;
  },
};