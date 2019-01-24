[@bs.module "react-div-100vh"] external reactDiv100vh: ReasonReact.reactClass = "default";

let make =  (children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=reactDiv100vh,
    ~props=Js.Obj.empty(),
    children,
  );
