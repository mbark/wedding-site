type t;

[@bs.deriving abstract]
type transitionType = {
  [@bs.as "type"]
  type_: string,
  duration: int,
};

[@bs.deriving abstract]
type scalePose = {
  scale: float,
  [@bs.optional] delay: int,
  [@bs.optional] transition: transitionType,
};

[@bs.deriving abstract]
type poses = {
  [@bs.optional] hoverable: bool,
  init: scalePose,
  full: scalePose,
  hover: scalePose,
};

[@bs.module "react-pose"] external posed: t = "default";

[@bs.send] external div: (t, poses) => ReasonReact.reactClass = "div";

[@bs.deriving abstract]
type divProps = {
  className: string,
  initialPose: string,
  pose: string,
};

let make =
    (
      ~poses: poses,
      ~className: string,
      ~initialPose: string,
      ~pose: string,
      children,
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=div(posed, poses),
    ~props=divProps(~className, ~initialPose, ~pose),
    children,
  );