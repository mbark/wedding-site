let component = ReasonReact.statelessComponent("Us");

let containerStyle = Css.(style([
    display(`flex),
    flexDirection(column),
    marginLeft(auto),
    alignItems(center),
]))

let imgStyle = Css.(style([
    maxWidth(rem(10.)),
]));

let make = _children => {
  ...component,

  render: _self => {
    let image = Assets.require("../images/us.png");

    <div className=containerStyle>
        <img className=imgStyle src=image alt="Us as bitmojis" />
        <div>{ReasonReact.string("Martin & Lisa")}</div>
    </div>
  },
};