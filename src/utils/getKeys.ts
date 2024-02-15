import { Tasks, Durations } from "./types";

const getKeys = (obj: Tasks | Durations) => {
  return Object.keys(obj);
};

export { getKeys };
