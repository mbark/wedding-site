let component = ReasonReact.statelessComponent("Us");

let containerStyle =
  Css.(
    style([
      display(`flex),
      flexDirection(column),
      marginLeft(auto),
      alignItems(center),
      marginRight(rem(1.)),
    ])
  );

let imgStyle = Css.(style([width(rem(10.)), height(rem(10.))]));

let dateStyle = Css.(style([fontSize(rem(0.6))]));

let headerStyle =
  Css.(style([marginBottom(`zero), marginTop(`zero), fontSize(em(1.2))]));

let poses =
  Posed.(
    poses(
      ~hoverable=true,
      ~init=poseT(~scale=0.4, ()),
      ~hover=poseT(~scale=1.2, ()),
      ~idle=
        poseT(
          ~scale=1.0,
          ~transition=Posed.transitionT(~duration=300, ~type_="spring", ()),
          (),
        ),
      (),
    )
  );

let make = _children => {
  ...component,

  render: _self => {
    let image = Assets.requireImg("../resources/images/us.png");

    <Posed
      poses
      element=Posed.div
      initialPose="init"
      pose="idle"
      className=containerStyle>
      <img
        className=imgStyle
        src={Assets.srcGet(image)}
        srcSet={Assets.srcSetGet(image)}
        alt=""
      />
      <h2 className=headerStyle> {ReasonReact.string("Martin & Lisa")} </h2>
      <div className=dateStyle> {ReasonReact.string("September 28")} </div>
    </Posed>;
  },
};