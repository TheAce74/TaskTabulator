import { getTotal } from "./getTotal";
import { ChakraAlert, Durations } from "./types";

const reminder = (
  durationsList: Durations,
  ref: React.MutableRefObject<ChakraAlert>,
  callback: () => void
) => {
  if (getTotal(durationsList) % 7200 === 0 && getTotal(durationsList) !== 0) {
    ref.current = {
      status: "success",
      title: "Reminder!",
      message: "Try to get some rest and eat well my love 💖",
    };
    callback();
  }
};

export { reminder };
