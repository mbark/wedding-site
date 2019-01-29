let component = ReasonReact.statelessComponent("Us");

let containerStyle =
  Css.(
    style([
      display(`flex),
      flexDirection(column),
      marginLeft(auto),
      alignItems(center),
    ])
  );

let imgStyle = Css.(style([width(rem(10.))]));

let dateStyle = Css.(style([fontSize(rem(0.6))]));

let poses =
  Posed.poses(
    ~hoverable=true,
    ~init=Posed.scalePose(~scale=0.4, ()),
    ~hover=Posed.scalePose(~scale=1.2, ()),
    ~full=
      Posed.scalePose(
        ~scale=1.0,
        ~transition=Posed.transitionType(~duration=300, ~type_="spring"),
        (),
      ),
    (),
  );

let make = _children => {
  ...component,

  render: _self => {
    let image = Assets.require("../images/us.png");

    <Posed poses initialPose="init" pose="full" className=containerStyle>
      <img className=imgStyle src=image alt="Us as bitmojis" />
      <div> {ReasonReact.string("Martin & Lisa")} </div>
      <div className=dateStyle> {ReasonReact.string("September 28")} </div>
    </Posed>;
  },
};