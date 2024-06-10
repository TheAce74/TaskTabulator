import { Heading } from "@chakra-ui/react";
import { Tasks } from "../utils/types";
import { getKeys } from "../utils/getKeys";
import { compareDesc, eachDayOfInterval, format, parse } from "date-fns";
import { getCustomToday } from "../utils/getCustomToday";
import { getCumulative } from "../utils/getCumulative";
import { MONTH_MAX_DAYS } from "../utils/constants";

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
  const previousCycleDays = tasksListDays.filter((day) => {
    const currentMonth = today.getMonth();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const currentYear =
      previousMonth !== 11 ? today.getFullYear() : today.getFullYear() - 1;
    const interval = eachDayOfInterval({
      start: new Date(currentYear, previousMonth, 1),
      end: new Date(currentYear, previousMonth, MONTH_MAX_DAYS[previousMonth]),
    }).map((item) => format(item, "PPPP"));
    return interval.includes(format(day, "PPPP"));
  });
  const previousCycleTasks = previousCycleDays.reduce(
    (acc, val) =>
      Object.assign(acc, {
        [format(val, "PPPP")]: tasksList[format(val, "PPPP")],
      }),
    {}
  );
  const cumulative = getCumulative(previousCycleTasks);

  return (
    <Heading fontSize="2xl" fontWeight={500} mb={6}>
      Last Cycle Cumulative: {cumulative}
    </Heading>
  );
}
