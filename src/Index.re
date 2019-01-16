open Styles;

Css.(
  global(
    "body",
    [
      backgroundColor(Theme.peach),
      color(Theme.crimson),
      fontFamily("Bitter, serif"),
    ],
  )
);

ReactDOMRe.renderToElementWithId(<Root />, "root");