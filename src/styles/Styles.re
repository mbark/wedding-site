module Theme = {
  open Css;

  let white = hex("FFF");
  let crimson = hex("700F00");
  let rose = hex("B55B4B");
  let peach = hex("F2D6CC");
  let forest = hex("2F4F07");
  let eucalyptus = hex("89A673");

  let animationDuration = 500;
};

let headerAnimation =
  Css.(
    style([
      animationName(
        keyframes([
          (0, [transform(translateX(px(-50))), opacity(0.)]),
          (100, [transform(translateX(pct(0.))), opacity(1.)]),
        ]),
      ),
      animationDuration(Theme.animationDuration),
      animationFillMode(`both),
    ])
  );

let mont =
  ["woff2", "woff", "otf", "eot"]
  |> List.map(ext =>
       Assets.require("../../resources/fonts/MontDemo-Heavy." ++ ext)
     )
  |> List.map(Css.url);

let fontMont =
  Css.(
    fontFamily(
      fontFace(~fontFamily="Mont", ~src=mont, ~fontWeight=`bold, ()),
    )
  );