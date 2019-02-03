type t;

[@bs.deriving abstract]
type transitionT = {
  [@bs.optional]
  [@bs.as "type"]
  type_: string,
  [@bs.optional]
  duration: int,
};

[@bs.deriving abstract]
type poseT = {
  [@bs.optional]
  scale: float,
  [@bs.optional]
  delay: int,
  [@bs.optional]
  opacity: float,
  [@bs.optional]
  y: string,
  [@bs.optional]
  x: string,
  [@bs.optional]
  transition: transitionT,
};

[@bs.deriving abstract]
type poses = {
  [@bs.optional]
  draggable: bool,
  [@bs.optional]
  dragBounds: Js.Dict.t(int),
  [@bs.optional]
  hoverable: bool,
  [@bs.optional]
  focusable: bool,
  [@bs.optional]
  pressable: bool,
  /* passive */
  [@bs.optional]
  label: string,
  [@bs.optional]
  init: poseT,
  [@bs.optional]
  hover: poseT,
  [@bs.optional]
  idle: poseT,
  [@bs.optional]
  enter: poseT,
  [@bs.optional]
  exit: poseT,
};

[@bs.module "react-pose"] external posed: t = "default";

type posedElement = (t, poses) => ReasonReact.reactClass;

[@bs.send] external div: (t, poses) => ReasonReact.reactClass = "div";
[@bs.send] external span: (t, poses) => ReasonReact.reactClass = "span";
[@bs.send] external h1: (t, poses) => ReasonReact.reactClass = "h1";

[@bs.deriving abstract]
type props = {
  className: option(string),
  initialPose: option(string),
  pose: option(string),
};

let make = (~poses, ~className=?, ~initialPose=?, ~pose=?, ~element: posedElement, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=element(posed, poses),
    ~props=props(~className, ~initialPose, ~pose),
    children,
  );

module SplitText = {
  [@bs.module "react-pose-text"]
  external component: ReasonReact.reactClass = "default";

  [@bs.deriving abstract]
  type delayT = {
    wordIndex: int,
    numWords: int,
    charIndex: int,
    numChars: int,
    charInWordIndex: int,
    numCharsInWord: int,
  };

  type staggeredDelay = delayT => int;

  [@bs.deriving abstract]
  type poseT = {
    [@bs.optional]
    y: string,
    [@bs.optional]
    opacity: float,
    [@bs.optional]
    [@bs.as "delay"]
    delayFn: staggeredDelay,
    [@bs.optional]
    delayVal: int,
    [@bs.optional]
    transition: transitionT,
  };

  [@bs.deriving abstract]
  type poses = {
    [@bs.optional]
    hoverable: bool,
    [@bs.optional]
    init: poseT,
    [@bs.optional]
    hover: poseT,
    [@bs.optional]
    idle: poseT,
    [@bs.optional]
    enter: poseT,
    [@bs.optional]
    exit: poseT,
  };

  [@bs.deriving abstract]
  type props = {
    className: option(string),
    initialPose: option(string),
    pose: option(string),
    wordPoses: option(poses),
    charPoses: option(poses),
  };

  let make =
      (
        ~initialPose=?,
        ~className=?,
        ~pose=?,
        ~wordPoses=?,
        ~charPoses=?,
        children,
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=component,
      ~props=
        props(~initialPose, ~pose, ~wordPoses, ~charPoses, ~className),
      children,
    );
};

module PoseGroup = {
  [@bs.module "react-pose"]
  external component: ReasonReact.reactClass = "PoseGroup";

  [@bs.deriving abstract]
  type poseT = {
    delayChildren: option(int),
    staggerChildren: option(int),
  };

  [@bs.deriving abstract]
  type props = {
    className: option(string),
    poses: option(poseT),
    animateOnMount: option(bool),
  };

  let make = (~className=?, ~poses=?, ~animateOnMount=?, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=component,
      ~props=props(~className, ~poses, ~animateOnMount),
      children,
    );
};