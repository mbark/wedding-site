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

let heavy = Assets.require("../resources/fonts/MontDemo-Heavy.otf");

Css.(
  global(
    "body",
    [
      backgroundColor(Theme.peach),
      color(Theme.crimson),
      fontFamily("Open Sans"),
    ],
  )
);

Css.(
  global(
    "h1, h2, h3, h4, h5",
    [
      fontFamily(
        fontFace(
          ~fontFamily="Mont",
          ~src=[`url(heavy)],
          ~fontWeight=`bold,
          (),
        ),
      ),
    ],
  )
);

ReactDOMRe.renderToElementWithId(<Root />, "root");