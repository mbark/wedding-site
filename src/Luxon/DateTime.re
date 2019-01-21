type t;

type datetimeunit = [
  | `year
  | `month
  | `day
  | `hour
  | `minute
  | `second
  | `millisecond
];

type dt = {
  .
  "year": int,
  "month": int,
  "day": int,
  "hour": int,
  "minute": int,
  "second": int,
  "millisecond": int,
};

[@bs.module "luxon"] [@bs.scope "DateTime"]
external localYMD: (int, int, int) => t = "local";

[@bs.module "luxon"] [@bs.scope "DateTime"] external local: unit => t = "";

[@bs.send.pipe: t]
external diff:
  (
    t,
    [@bs.string] [
      | `year
      | `month
      | `day
      | `hour
      | `minute
      | `second
      | `millisecond
    ]
  ) =>
  Duration.t =
  "";

[@bs.send.pipe: t]
external hasSame:
  (
    t,
    [@bs.string] [
      | `year
      | `month
      | `day
      | `hour
      | `minute
      | `second
      | `millisecond
    ]
  ) =>
  bool =
  "";