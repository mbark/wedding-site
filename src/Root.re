type route =
  | Frontpage
  | RSVPForm;

type state = {nowShowing: route};

type action =
  | ChangeRoute(route);

let mapUrlToRoute = (url: ReasonReact.Router.url) =>
  switch (url.path) {
  | ["rsvp"] => RSVPForm
  | _ => Frontpage
  };

let reducer:
  (action, state) =>
  ReasonReact.update(state, ReasonReact.noRetainedProps, action) =
  (action, _state) =>
    switch (action) {
    | ChangeRoute(route) => ReasonReact.Update({nowShowing: route})
    };

let component = ReasonReact.reducerComponent("Root");
let make = _children => {
  ...component,

  initialState: () => {nowShowing: Frontpage},

  reducer,

  didMount: self => {
    let id =
      ReasonReact.Router.watchUrl(url =>
        self.send(ChangeRoute(url |> mapUrlToRoute))
      );
    self.onUnmount(() => ReasonReact.Router.unwatchUrl(id));
  },

  render: self => {
    let rootStyle =
      Css.(
        style([
          display(`flex),
          justifyContent(`spaceBetween),
          flexDirection(`column),
          height(pct(100.)),
          overflowX(`hidden),
        ])
      );

    <FullHeightDiv>
      <Bird />
      <div className=rootStyle>
        <Us />
        { self.state.nowShowing == Frontpage ? <Frontpage /> : <RSVP /> }
      </div>
    </FullHeightDiv>;
  },
};