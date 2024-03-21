import { Heading } from "@chakra-ui/react";
import { Tasks } from "../utils/types";
import { getKeys } from "../utils/getKeys";
import { compareDesc, format, parse } from "date-fns";
import { getCustomToday } from "../utils/getCustomToday";
import { getCumulative } from "../utils/getCumulative";

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
  const lastTwoCyclesDays = tasksListDays.filter((day) => {
    const currentMonth = today.getMonth();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousTwoMonths = previousMonth === 0 ? 11 : previousMonth - 1;
    const currentYear = today.getFullYear();
    const previousYear = currentYear - 1;
    const previousCycleEndDate = new Date(2024, previousMonth, 19);
    const previousCycleStartDate = new Date(2024, previousTwoMonths, 20);
    return (
      (day.getMonth() === previousTwoMonths &&
        day.getDate() >= 20 &&
        previousCycleEndDate.getDate() < 20 &&
        (day.getFullYear() === currentYear ||
          day.getFullYear() === previousYear)) ||
      (day.getMonth() === previousMonth &&
        day.getDate() < 20 &&
        previousCycleStartDate.getDate() >= 20 &&
        day.getFullYear() === currentYear) ||
      (day.getMonth() === previousTwoMonths &&
        day.getDate() >= 20 &&
        day.getFullYear() === currentYear)
    );
  });
  const lastTwoCyclesTasks = lastTwoCyclesDays.reduce(
    (acc, val) =>
      Object.assign(acc, {
        [format(val, "PPPP")]: tasksList[format(val, "PPPP")],
      }),
    {}
  );
  const cumulative = getCumulative(lastTwoCyclesTasks);

  return (
    <Heading fontSize="2xl" fontWeight={500} mb={6}>
      Last Two Cycles Cumulative: {cumulative}
    </Heading>
  );
}
