Assets.require("react-div-100vh");

/* [@bs.module "./myJSReactClass"] external myJSReactClass: ReasonReact.reactClass = "default"; */

[@bs.module "react-div-100vh"] external reactDiv100vh: ReasonReact.reactClass = "default";

/* Assets.require("react-div-100vh"); */

let make =  (children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=reactDiv100vh,
    ~props=Js.Obj.empty(),
    children,
  );
