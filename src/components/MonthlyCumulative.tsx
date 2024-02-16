import { Heading } from "@chakra-ui/react";
import { Tasks } from "../utils/types";
import { getKeys } from "../utils/getKeys";
import { compareDesc, format, parse } from "date-fns";
import { getCustomToday } from "../utils/getCustomToday";
import { getCumulative } from "../utils/getCumulative";

type MonthlyCumulativeProps = {
  tasksList: Tasks;
};

export default function MonthlyCumulative({
  tasksList,
}: MonthlyCumulativeProps) {
  const tasksListDays = getKeys(tasksList)
    .map((day) => parse(day, "PPPP", new Date()))
    .sort(compareDesc);
  const today = parse(getCustomToday(), "PPPP", new Date());
  const currentMonthDays = tasksListDays.filter(
    (day) =>
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
  );
  const currentMonthTasks = currentMonthDays.reduce(
    (acc, val) =>
      Object.assign(acc, {
        [format(val, "PPPP")]: tasksList[format(val, "PPPP")],
      }),
    {}
  );
  const cumulative = getCumulative(currentMonthTasks);

  return (
    <Heading fontSize="2xl" fontWeight={500} mb={6} data-testid="cumulative">
      Monthly Cumulative: {cumulative}
    </Heading>
  );
}
