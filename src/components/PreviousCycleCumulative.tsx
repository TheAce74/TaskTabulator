import { Heading } from "@chakra-ui/react";
import { Tasks } from "../utils/types";
import { getKeys } from "../utils/getKeys";
import { compareDesc, eachDayOfInterval, format, parse } from "date-fns";
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
    const previousTwoMonths = previousMonth === 0 ? 11 : previousMonth - 1;
    const currentYear = today.getFullYear();
    const interval = eachDayOfInterval({
      start:
        today.getDate() < 19
          ? new Date(currentYear, previousTwoMonths, 20)
          : new Date(currentYear, previousMonth, 20),
      end:
        today.getDate() < 19
          ? new Date(currentYear, previousMonth, 19)
          : new Date(currentYear, currentMonth, 19),
    }).map((item) => format(item, "PPPP"));
    return interval.includes(format(day, "PPPP"));
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
