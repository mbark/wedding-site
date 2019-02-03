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

let imgStyle = Css.(style([width(rem(6.)), marginTop(`auto)]));

let poses =
  Posed.(
    poses(
      ~hoverable=true,
      ~init=poseT(~y="-100%", ()),
      ~hover=poseT(~y="-20%", ()),
      ~idle=
        poseT(
          ~y="0%",
          ~transition=Posed.transitionT(~duration=500, ~type_="spring", ()),
          (),
        ),
      (),
    )
  );

let make = _children => {
  ...component,

  render: _self => {
    let image = Assets.requireImg("../resources/images/bird.png");

  Js.log(image);

    <Posed
      poses
      element=Posed.div
      initialPose="init"
      pose="idle"
      className=wrapperStyle>
      <img
        className=imgStyle
        src={Assets.srcGet(image)}
        srcSet={Assets.srcSetGet(image)}
        alt="Paper crane bird"
      />
    </Posed>;
  },
};