type state = {now: DateTime.t};

type action =
  | Tick;

let style = Css.(style([textTransform(uppercase), fontSize(em(0.7))]));

let component = ReasonReact.reducerComponent("Countdown");

let make = _children => {
  ...component,

  initialState: () => {now: DateTime.local()},

  reducer: (action, _state) =>
    switch (action) {
    | Tick => ReasonReact.Update({now: DateTime.local()})
    },

  didMount: self => {
    let intervalId = Js.Global.setInterval(() => self.send(Tick), 1000);
    self.onUnmount(() => Js.Global.clearInterval(intervalId));
  },

  render: self => {
    let countdownTo = DateTime.localYMD(2019, 09, 28);

    let durationLeft: Duration.t =
      DateTime.diff(self.state.now, `second, countdownTo);

    let withUnit = l =>
      Belt.List.zipBy(
        l,
        ["days", "hours", "minutes and", "seconds"],
        (a: string, b: string) =>
        a ++ " " ++ b
      );

    let countdown =
      Duration.toFormat("d h m s", durationLeft)
      |> Js.String.split(" ")
      |> Belt.List.fromArray
      |> withUnit
      |> Belt.List.toArray
      |> Js.Array.joinWith(" ");

    <div className=style>
      {ReasonReact.string("In " ++ countdown)}
    </div>;
  },
};