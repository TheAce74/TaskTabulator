import { Heading } from "@chakra-ui/react";
import { Tasks } from "../utils/types";
import { getKeys } from "../utils/getKeys";
import { compareDesc, eachDayOfInterval, format, parse } from "date-fns";
import { getCustomToday } from "../utils/getCustomToday";
import { getCumulative } from "../utils/getCumulative";
import { MONTH_MAX_DAYS } from "../utils/constants";

type PreviousTwoCyclesCumulativeProps = {
  tasksList: Tasks;
};

export default function PreviousTwoCyclesCumulative({
  tasksList,
}: PreviousTwoCyclesCumulativeProps) {
  const tasksListDays = getKeys(tasksList)
    .map((day) => parse(day, "PPPP", new Date()))
    .sort(compareDesc);
  const today = parse(getCustomToday(), "PPPP", new Date());
  const previousTwoCyclesDays = tasksListDays.filter((day) => {
    const currentMonth = today.getMonth();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousTwoMonths = previousMonth === 0 ? 11 : previousMonth - 1;
    const currentYear =
      previousTwoMonths !== 11 ? today.getFullYear() : today.getFullYear() - 1;
    const interval = eachDayOfInterval({
      start: new Date(currentYear, previousTwoMonths, 1),
      end: new Date(
        currentYear,
        previousTwoMonths,
        MONTH_MAX_DAYS[previousTwoMonths]
      ),
    }).map((item) => format(item, "PPPP"));
    return interval.includes(format(day, "PPPP"));
  });
  const previousTwoCyclesTasks = previousTwoCyclesDays.reduce(
    (acc, val) =>
      Object.assign(acc, {
        [format(val, "PPPP")]: tasksList[format(val, "PPPP")],
      }),
    {}
  );
  const cumulative = getCumulative(previousTwoCyclesTasks);

  return (
    <Heading fontSize="2xl" fontWeight={500} mb={6}>
      Last Two Cycles Cumulative: {cumulative}
    </Heading>
  );
}
