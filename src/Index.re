Assets.requireCss("normalize.css");

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
      fontFamily("Open Sans"),
    ],
  )
);

Css.(global("h1, h2, h3, h4, h5", [Styles.fontMont]));

Css.(
  global(
    "h1",
    [textTransform(`uppercase), lineHeight(em(0.9))],
  )
);

[@bs.val] [@bs.scope "module"] external isHotEnabled: bool = "hot";

[@bs.val] [@bs.scope ("module", "hot")]
external hotAccept: unit => unit = "accept";

ReactDOMRe.renderToElementWithId(<Root />, "root");
ReasonReact.Router.push("");

if (isHotEnabled) {
  hotAccept();
};