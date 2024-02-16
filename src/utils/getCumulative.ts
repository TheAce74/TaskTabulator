import { getDuration } from "./getDuration";
import { getKeys } from "./getKeys";
import { getTotal } from "./getTotal";
import { Tasks } from "./types";

const getCumulative = (tasks: Tasks) => {
  const tasksDays = getKeys(tasks);

  if (tasksDays.length !== 0) {
    return getDuration(
      Object.keys(tasksDays).reduce(
        (acc, val) => acc + getTotal(tasks[tasksDays[Number(val)]].durations),
        0
      )
    );
  } else {
    return "0 secs";
  }
};

export { getCumulative };
