import { Heading } from "@chakra-ui/react";
import { Tasks } from "../utils/types";
import { getKeys } from "../utils/getKeys";
import { compareDesc, format, parse } from "date-fns";
import { getCustomToday } from "../utils/getCustomToday";
import { getCumulative } from "../utils/getCumulative";

type PreviousCycleCumulativeProps = {
  tasksList: Tasks;
};

export default function PreviousCycleCumulative({
  tasksList,
}: PreviousCycleCumulativeProps) {
  const tasksListDays = getKeys(tasksList)
    .map((day) => parse(day, "PPPP", new Date()))
    .sort(compareDesc);
  const today = parse(getCustomToday(), "PPPP", new Date());
  const lastCycleDays = tasksListDays.filter((day) => {
    const currentMonth = today.getMonth();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const currentYear = today.getFullYear();
    const previousYear = currentYear - 1;
    return (
      (day.getMonth() === previousMonth &&
        day.getDate() >= 20 &&
        today.getDate() < 20 &&
        (day.getFullYear() === currentYear ||
          day.getFullYear() === previousYear)) ||
      (day.getMonth() === currentMonth &&
        day.getDate() < 20 &&
        today.getDate() > 20 &&
        day.getFullYear() === currentYear) ||
      (day.getMonth() === previousMonth &&
        day.getDate() >= 20 &&
        day.getFullYear() === currentYear)
    );
  });
  const lastCycleTasks = lastCycleDays.reduce(
    (acc, val) =>
      Object.assign(acc, {
        [format(val, "PPPP")]: tasksList[format(val, "PPPP")],
      }),
    {}
  );
  const cumulative = getCumulative(lastCycleTasks);

  return (
    <Heading fontSize="2xl" fontWeight={500} mb={6}>
      Last Cycle Cumulative: {cumulative}
    </Heading>
  );
}
