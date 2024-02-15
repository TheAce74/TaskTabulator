import { Durations } from "./types";

const getTotal = (obj: Durations) => {
  return Object.keys(obj).reduce(
    (acc, val) => acc + Number(val) * obj[Number(val)],
    0
  );
};

export { getTotal };
