open Styles;

Css.(
  global(
    "html",
    [
      media("(max-width: 767px)", [fontSize(pct(100.))]),
      media(
        "(min-width: 768px) and (max-width: 1024px)",
        [fontSize(pct(140.))],
      ),
      media("(min-width: 1025px)", [fontSize(pct(160.))]),
    ],
  )
);

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