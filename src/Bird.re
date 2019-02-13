type state = {loaded: bool};

type action =
  | OnLoad;

let component = ReasonReact.reducerComponent("Bird");

let image = Assets.requireImg("../resources/images/bird.png"); 
let imgStyle = Css.(style([width(rem(6.)), marginTop(`auto)]));

let make = _children => {
  ...component,

  initialState: () => {loaded: false},

  reducer: (action, _state) =>
    switch (action) {
    | OnLoad => ReasonReact.Update({loaded: true})
    },

  render: self => {
    let wrapperStyle =
      Css.(
        style([
          position(`absolute),
          height(rem(7.)),
          left(rem(2.)),
          display(`flex),
          opacity(self.state.loaded ? 1. : 0.),
          transform(translateY(pct(self.state.loaded ? 0. : -100.))),
          transition(~duration=500, "opacity"),
          transition(~duration=500, "transform"),
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

    <div className=wrapperStyle>
      <img
        className=imgStyle
        src={Assets.srcGet(image)}
        srcSet={Assets.srcSetGet(image)}
        onLoad=(_img => self.send(OnLoad))
        alt=""
      />
    </div>;
  },
};