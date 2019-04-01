type attendance =
  | IsAttending
  | NotAttending;

type state = {attending: bool};

type action =
  | Select(attendance);

let component = ReasonReact.reducerComponent("RSVP");

let make = _children => {
  ...component,
  initialState: () => {attending: false},
  reducer: (action, state) =>
    switch (action) {
    | Select(attendance) =>
      ReasonReact.Update({attending: attendance == IsAttending})
    },
  render: ({state, send}) => {
    let containerStyle =
      Css.(
        style([
          display(`flex),
          flexDirection(`column),
          marginLeft(rem(1.5)),
          height(pct(100.)),
        ])
      );

    let headerStyle =
      Css.(
        merge([
          style([
            alignSelf(`flexStart),
            marginTop(`zero),
            marginBottom(rem(2.0)),
          ]),
          Styles.headerAnimation,
        ])
      );

    let input =
      Css.(
        Css.style([
          selector(
            "input[type=text]",
            [
              borderRadius(px(6)),
              backgroundColor(Styles.Theme.crimson20),
              border(px(2), `solid, Styles.Theme.crimson20),
              backgroundClip(`paddingBox),
              padding2(~v=px(4), ~h=px(6)),
              color(Styles.Theme.white),
              selector(
                "&:focus",
                [
                  boxShadow(
                    ~x=`zero,
                    ~y=`zero,
                    ~blur=px(4),
                    Styles.Theme.crimson,
                  ),
                ],
              ),
            ],
          ),
        ])
      );

    let formStyle =
      Css.(
        merge([
          style([
            display(`flex),
            flexDirection(`column),
            paddingBottom(rem(2.)),
            paddingRight(rem(2.)),
          ]),
          input,
        ])
      );

    let labelStyle = Css.(style([Styles.fontMont, display(`block)]));

    let rowClass = Css.(style([marginBottom(rem(1.))]));

    let toggle =
      Css.(
        merge([
          style([
            selector(
              "input[type=radio]",
              [
                height(`zero),
                width(`zero),
                position(`absolute),
                opacity(0.0),
                bottom(`zero),
                left(rem(0.3)),
                selector(
                  "&:checked + label",
                  [backgroundColor(Styles.Theme.crimson)],
                ),
                selector(
                  "&:focus + label",
                  [borderColor(Styles.Theme.crimson)],
                ),
              ],
            ),
            selector(
              "input[type=radio] + label",
              [
                cursor(`pointer),
                textIndent(px(-9999)),
                width(em(0.6)),
                height(em(0.6)),
                border(px(3), `solid, Styles.Theme.crimson20),
                display(`inlineBlock),
                borderRadius(em(0.6)),
                position(`relative),
                transition("all", ~duration=200),
                selector("&:hover", [borderColor(Styles.Theme.crimson)]),
              ],
            ),
          ]),
        ])
      );

    let radioWrapper =
      Css.(
        style([
          marginRight(rem(1.0)),
          display(`inlineFlex),
          alignItems(`center),
          position(`relative),
        ])
      );

    let fieldsetStyle =
      Css.(
        merge([
          style([
            borderWidth(`zero),
            padding(`zero),
            marginLeft(`zero),
            selector("label", [marginRight(rem(0.3))]),
          ]),
          rowClass,
          toggle,
        ])
      );

    let buttonStyle =
      Css.(
        style([
          padding2(~v=rem(0.5), ~h=rem(1.5)),
          position(`relative),
          backgroundColor(Styles.Theme.crimson),
          color(Styles.Theme.white),
          borderStyle(`none),
          unsafe("width", "max-content"),
          Styles.fontMont,
          borderRadius(px(8)),
          boxShadow(
            ~y=px(4),
            ~blur=px(4),
            ~spread=px(1),
            rgba(0, 0, 0, 0.25),
          ),
          cursor(`pointer),
          transition(~duration=200, "all"),
          selector(
            "&::after",
            [
              contentRule(""),
              borderRadius(px(8)),
              position(`absolute),
              zIndex(1),
              top(`zero),
              left(`zero),
              width(pct(100.)),
              height(pct(100.)),
              boxShadow(
                ~y=px(8),
                ~blur=px(4),
                ~spread=px(2),
                rgba(0, 0, 0, 0.20),
              ),
              opacity(0.0),
              transition(~duration=200, "all"),
            ],
          ),
          selector(
            "&:hover",
            [
              transform(scale(1.10, 1.10)),
              selector("&::after", [opacity(1.0)]),
            ],
          ),
          selector(
            "&:active",
            [
              transform(scale(0.95, 0.95)),
              selector("&::after", [opacity(0.0)]),
            ],
          ),
        ])
      );

    let extraStyle =
      Css.(
        style([
          maxHeight(`zero),
          transition(~duration=1000, ~timingFunction=`easeIn, "max-height"),
          overflow(`hidden),
          selector(
            "&:not(:empty)",
            [
              maxHeight(vh(100.)),
              transition(
                ~duration=1000,
                ~timingFunction=`easeOut,
                "max-height",
              ),
            ],
          ),
        ])
      );

    let extraInformation =
      <div>
        <div className=rowClass>
          <label className=labelStyle>
            {ReasonReact.string("Food preferences")}
          </label>
          <input required=true type_="text" />
        </div>
        <fieldset className=fieldsetStyle>
          <legend className=labelStyle>
            {ReasonReact.string("Alcohol")}
          </legend>
          <div className=radioWrapper>
            <input
              type_="radio"
              required=true
              id="alcohol-yes"
              name="alcohol"
              value="yes"
            />
            <label htmlFor="alcohol-yes" />
            <label htmlFor="alcohol-yes"> {ReasonReact.string("Yes")} </label>
          </div>
          <div className=radioWrapper>
            <input
              type_="radio"
              required=true
              id="alcohol-no"
              name="alcohol"
              value="no"
            />
            <label htmlFor="alcohol-no" />
            <label htmlFor="alcohol-no"> {ReasonReact.string("No")} </label>
          </div>
        </fieldset>
      </div>;

    let updateAttendance = event =>
      send(
        Select(
          ReactEvent.Form.target(event)##value == "yes"
            ? IsAttending : NotAttending,
        ),
      );

    let form =
      <form name="rsvp" method="post" className=formStyle>
        <div className=rowClass>
          <label className=labelStyle> {ReasonReact.string("Name")} </label>
          <input required=true type_="text" />
        </div>
        <fieldset className=fieldsetStyle>
          <legend className=labelStyle>
            {ReasonReact.string("I will be attending!")}
          </legend>
          <div>
            <div className=radioWrapper>
              <input
                required=true
                type_="radio"
                id="attending"
                name="attending"
                value="yes"
                onChange=updateAttendance
              />
              <label htmlFor="attending" />
              <label htmlFor="attending"> {ReasonReact.string("Yes")} </label>
            </div>
            <div className=radioWrapper>
              <input
                required=true
                type_="radio"
                id="not-attending"
                name="attending"
                value="no"
                onChange=updateAttendance
              />
              <label htmlFor="not-attending" />
              <label htmlFor="not-attending">
                {ReasonReact.string("No")}
              </label>
            </div>
          </div>
        </fieldset>
        <div className=extraStyle>
          {state.attending ? extraInformation : ReasonReact.null}
        </div>
        <button className=buttonStyle name="sign-up" type_="submit">
          {ReasonReact.string(
             state.attending ? "Sign me up baby!" : "See you another time?",
           )}
        </button>
      </form>;

    let netlifyForm =
      ReasonReact.cloneElement(form, ~props={"netlify": ""}, [||]);

    <div className=containerStyle>
      <h1 className=headerStyle> {ReasonReact.string("RSVP")} </h1>
      netlifyForm
    </div>;
  },
};