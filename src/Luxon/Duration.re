type t;

type dt = {
  .
  "years": int,
  "months": int,
  "weeks": int,
  "days": int,
  "hours": int,
  "minutes": int,
  "seconds": int,
  "milliseconds": int,
};

[@bs.send.pipe: t] external toFormat: string => string = "";