import { Box, Heading } from "@chakra-ui/react";
import { getDuration } from "../utils/getDuration";
import { Durations } from "../utils/types";
import { getTotal } from "../utils/getTotal";
import TaskTable from "./TaskTable";

type CurrentDayTaskProps = {
  durationsList: Durations;
  setDurationsList: (newDurationsList: Durations) => void;
};

export default function CurrentDayTask({
  durationsList,
  setDurationsList,
}: CurrentDayTaskProps) {
  return (
    <Box>
      <Heading fontSize="2xl" fontWeight={500} mb={6}>
        Total time today:{" "}
        {durationsList ? getDuration(getTotal(durationsList)) : "0 secs"}
      </Heading>
      <TaskTable
        durationsList={durationsList}
        isCurrentDay={true}
        setDurationsList={setDurationsList}
      />
    </Box>
  );
}
