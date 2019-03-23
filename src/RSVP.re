let component = ReasonReact.statelessComponent("RSVP");

let make = _children => {
  ...component,
  render: _self => {
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
          style([alignSelf(`flexStart), marginTop(`zero), marginBottom(rem(2.0))]),
          Styles.headerAnimation,
        ])
      );

    let formStyle =
      Css.(
        style([
          display(`flex),
          flexDirection(`column),
          paddingBottom(rem(2.)),
          paddingRight(rem(2.)),
        ])
      );

    let labelStyle = Css.(style([Styles.fontMont, display(`block)]));

    let rowClass = Css.(style([marginBottom(rem(1.))]));

    let toggleHeight = 20;
    let togglePadding = 3;
    let togglerSize = toggleHeight - togglePadding * 2;

    let toggle =
      Css.(
        merge([
          style([display(`flex), alignItems(`center)]),
          style([
            selector(
              "input[type=checkbox]",
              [
                height(`zero),
                width(`zero),
                visibility(`hidden),
                display(`none),
                selector(
                  "&:checked + label",
                  [backgroundColor(Styles.Theme.eucalyptus)],
                ),
                selector(
                  "&:checked + label::after",
                  [
                    left(Calc.(-)(pct(100.0), px(togglePadding))),
                    transform(translateX(pct(-100.0))),
                  ],
                ),
              ],
            ),
            selector(
              "input[type=checkbox] + label",
              [
                cursor(`pointer),
                textIndent(px(-9999)),
                width(px(toggleHeight * 2)),
                height(px(toggleHeight)),
                background(Styles.Theme.rose),
                display(`inlineBlock),
                borderRadius(px(toggleHeight)),
                position(`relative),
                selector(
                  "&::after",
                  [
                    contentRule(""),
                    position(`absolute),
                    top(px(togglePadding)),
                    left(px(togglePadding)),
                    width(px(togglerSize)),
                    height(px(togglerSize)),
                    background(Styles.Theme.white),
                    borderRadius(px(toggleHeight - togglePadding * 2)),
                    transition(~duration=300, "all"),
                    selector("&:active", [width(px(130))]),
                  ],
                ),
              ],
            ),
          ]),
        ])
      );

    let fieldsetStyle =
      Css.(
        merge([
          style([
            borderWidth(`zero),
            padding(`zero),
            selector("label", [marginRight(rem(0.3))]),
            display(`flex),
            flexDirection(`column),
            selector("& > *", [marginBottom(rem(0.5))]),
          ]),
          rowClass,
        ])
      );

    <div className=containerStyle>
      <h1 className=headerStyle> {ReasonReact.string("RSVP")} </h1>
      <form name="rsvp" className=formStyle>
        <div className=rowClass>
          <label className=labelStyle> {ReasonReact.string("Name")} </label>
          <input type_="text" />
        </div>
        <fieldset className=fieldsetStyle>
          <legend className=labelStyle>
            {ReasonReact.string("Food preference")}
          </legend>
          <div className=toggle>
            <input type_="checkbox" id="gluten" name="food" />
            <label htmlFor="gluten" />
            <label htmlFor="gluten"> {ReasonReact.string("Gluten")} </label>
          </div>
          <div className=toggle>
            <input type_="checkbox" id="lactose" name="food" />
            <label htmlFor="lactose" />
            <label htmlFor="lactose"> {ReasonReact.string("Gluten")} </label>
          </div>
          <div className=toggle>
            <input type_="checkbox" id="vegan" name="food" />
            <label htmlFor="vegan" />
            <label htmlFor="vegan"> {ReasonReact.string("Vegan")} </label>
          </div>
          <div className=toggle>
            <input type_="checkbox" id="cacao" name="food" />
            <label htmlFor="cacao" />
            <label htmlFor="cacao"> {ReasonReact.string("Cacao")} </label>
          </div>
        </fieldset>
        <fieldset className=fieldsetStyle>
          <legend className=labelStyle>
            {ReasonReact.string("Alcohol")}
          </legend>
          <div className=toggle>
            <input type_="checkbox" id="alcohol" name="alcohol" />
            <label htmlFor="alcohol" />
          </div>
        </fieldset>
        <button type_="submit">
          {ReasonReact.string("Sign me up baby!")}
        </button>
      </form>
    </div>;
  },
};