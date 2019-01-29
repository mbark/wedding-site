type t;

[@bs.deriving abstract]
type transitionType = {
  [@bs.as "type"]
  type_: string,
  duration: int,
};

[@bs.deriving abstract]
type scalePose = {
  [@bs.optional]
  scale: float,
  [@bs.optional]
  delay: int,
  [@bs.optional]
  y: string,
  [@bs.optional]
  transition: transitionType,
};

[@bs.deriving abstract]
type poses = {
  [@bs.optional]
  hoverable: bool,
  init: scalePose,
  full: scalePose,
  [@bs.optional]
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

module SplitText = {
  [@bs.module "react-pose-text"]
  external component: ReasonReact.reactClass = "default";

  [@bs.deriving abstract]
  type delayType = {
    wordIndex: int,
    numWords: int,
    charIndex: int,
    numChars: int,
    charInWordIndex: int,
    numCharsInWord: int,
  };

  type staggeredDelay = delayType => int;

  [@bs.deriving abstract]
  type opacityPose = {
    opacity: float,
    [@bs.optional]
    delay: staggeredDelay,
    [@bs.optional]
    transition: transitionType,
  };

  [@bs.deriving abstract]
  type textPoses = {
    [@bs.optional]
    hoverable: bool,
    [@bs.optional]
    init: opacityPose,
    [@bs.optional] hover: opacityPose,
    [@bs.optional]
    full: opacityPose,
  };

  [@bs.deriving abstract]
  type props = {
    initialPose: string,
    pose: string,
    wordPoses: textPoses,
    charPoses: textPoses,
  };

  let make =
      (~wordPoses: textPoses, ~charPoses, ~initialPose: string, ~pose: string, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=component,
      ~props=props(~initialPose, ~pose, ~wordPoses, ~charPoses),
      children,
    );
};