import { AbsoluteCenter, Box, Divider, Heading, Text } from "@chakra-ui/react";
import MessageGenerator from "./components/MessageGenerator";
import CurrentDayTask from "./components/CurrentDayTask";
import PreviousDaysTasks from "./components/PreviousDaysTasks";
import { Durations, Tasks } from "./utils/types";
import { useState, useEffect, useMemo } from "react";
import { getItem, setItem } from "./utils/localStorage";
import { getCustomToday } from "./utils/getCustomToday";
import { durations } from "./data/durations";
import PreviousTasksButton from "./components/PreviousTasksButton";
import MonthlyCumulative from "./components/MonthlyCumulative";
import PreviousCycleCumulative from "./components/PreviousCycleCumulative";
import PreviousTwoCyclesCumulative from "./components/PreviousTwoCyclesCumulative";

function App() {
  const [tasksList, setTasksList] = useState<Tasks>({});
  const today = useMemo(() => {
    return getCustomToday();
  }, []);

  const setDurationsList = (newDurationsList: Durations, day?: string) => {
    const tasks = getItem("vicky") as Tasks;
    let updatedTasks: Tasks;
    const customDay = day ? day : today;
    if (tasks) {
      updatedTasks = Object.assign({}, tasks, {
        [customDay]: {
          durations: newDurationsList,
        },
      });
    } else {
      updatedTasks = Object.assign({}, tasksList, {
        [customDay]: {
          durations: newDurationsList,
        },
      });
    }
    setItem("vicky", updatedTasks);
    setTasksList(updatedTasks);
  };

  useEffect(() => {
    const tasks = getItem("vicky") as Tasks;
    let durationsObject: Durations;
    if (tasks && today in tasks) {
      durationsObject = tasks[today].durations;
    } else {
      durationsObject = {};
      durations.forEach((duration) => (durationsObject[duration] = 0));
    }
    const updatedTasks = Object.assign({}, tasks, {
      [today]: {
        durations: durationsObject,
      },
    });
    setTasksList(updatedTasks);
  }, [today]);

  return (
    <Box w="100%" minHeight="100dvh" p={4}>
      <Heading as="h1" pb={2}>
        Welcome Vicky 💖
      </Heading>
      <MessageGenerator />
      <Box position="relative" py={8}>
        <Divider />
        <AbsoluteCenter bg="vicky.900" px="4">
          <Text align="center">Today's tasks</Text>
        </AbsoluteCenter>
      </Box>
      <PreviousTwoCyclesCumulative tasksList={tasksList} />
      <PreviousCycleCumulative tasksList={tasksList} />
      <MonthlyCumulative tasksList={tasksList} />
      <CurrentDayTask
        durationsList={tasksList[today]?.durations}
        setDurationsList={setDurationsList}
      />
      <Box position="relative" py={8}>
        <Divider />
        <AbsoluteCenter bg="vicky.900" px="4">
          <Text align="center">Previous days tasks</Text>
        </AbsoluteCenter>
      </Box>
      <PreviousTasksButton
        setDurationsList={setDurationsList}
        tasksList={tasksList}
      />
      <PreviousDaysTasks tasksList={tasksList} />
    </Box>
  );
}

export default App;
