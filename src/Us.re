type state = {loaded: bool, imageAnimated: bool};

type action =
  | OnLoad
  | ImageAnimationDone;

let component = ReasonReact.reducerComponent("Us");

let containerStyle = Css.(style([marginLeft(auto), marginRight(rem(1.))]));

let image = Assets.requireImg("../resources/images/us.png");

let dateStyle = Css.(style([fontSize(rem(0.6))]));

let headerStyle =
  Css.(style([marginBottom(`zero), marginTop(`zero), fontSize(em(1.2))]));

let make = _children => {
  ...component,

  initialState: () => {loaded: false, imageAnimated: false},

  reducer: (action, state) =>
    switch (action) {
    | OnLoad => ReasonReact.Update({...state, loaded: true})
    | ImageAnimationDone => ReasonReact.Update({...state, imageAnimated: true})
    }, 

  render: self => {
    let imgStyle =
      Css.(
        style([
          width(rem(10.)),
          height(rem(10.)),
          opacity(self.state.loaded ? 1. : 0.),
          transform(self.state.loaded ? scale(1., 1.) : scale(0., 0.)),
          transition(~duration=500, "opacity"),
          transition(~duration=500, "transform"),
        ])
      ); 

      let textStyle =
        Css.(
          style([
            display(`flex),
            alignItems(`center),
            animationFillMode(`both),
            flexDirection(`column),
            opacity(self.state.imageAnimated ? 1. : 0.),
            transform(translateY(px(self.state.imageAnimated ? 0 : -10))),
            transition(~duration=500, "opacity"),
            transition(~duration=500, "transform"),
          ])
        ); 

    let onLoad = _img => {
      self.send(OnLoad);
      let _id = Js.Global.setTimeout(() => self.send(ImageAnimationDone), 500);
      ();
    }; 

    <div className=containerStyle>
      <img
        className=imgStyle
        src={Assets.srcGet(image)}
        srcSet={Assets.srcSetGet(image)}
        onLoad
        alt=""
      />
      <div className=textStyle>
        <h2 className=headerStyle> {ReasonReact.string("Martin & Lisa")} </h2>
        <div className=dateStyle> {ReasonReact.string("September 28")} </div>
      </div>
    </div>;
  },
};