let component = ReasonReact.statelessComponent("Bird");

let imgStyle = Css.(style([
    maxWidth(px(50)),
    marginTop(rem(2.)),
]));

let make = _children => {
  ...component,

  render: _self => {
    let image = Assets.require("../images/bird.png");
    <img className=imgStyle src=image alt="Paper crane bird" />
  },
};