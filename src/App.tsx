import { AbsoluteCenter, Box, Divider, Heading, Text } from "@chakra-ui/react";
import MessageGenerator from "./components/MessageGenerator";
import CurrentDayTask from "./components/CurrentDayTask";
import PreviousDaysTasks from "./components/PreviousDaysTasks";
import { Durations, Tasks } from "./utils/types";
import { useState, useEffect, useMemo, useRef } from "react";
import { getItem, setItem } from "./utils/localStorage";
import { getCustomToday } from "./utils/getCustomToday";
import { durations } from "./data/durations";
import PreviousTasksButton from "./components/PreviousTasksButton";
import MonthlyCumulative from "./components/MonthlyCumulative";
import PreviousCycleCumulative from "./components/PreviousCycleCumulative";
import PreviousTwoCyclesCumulative from "./components/PreviousTwoCyclesCumulative";
import { Input, Button } from "@chakra-ui/react";

function App() {
  const [tasksList, setTasksList] = useState<Tasks>({});
  const today = useMemo(() => {
    return getCustomToday();
  }, []);

  const [isVicky, setIsVicky] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  return isVicky ? (
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
  ) : (
    <Box
      maxWidth="40rem"
      as="form"
      p="2em"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(import.meta.env.VITE_PASSWORD);
        if (inputRef.current?.value === import.meta.env.VITE_PASSWORD) {
          setIsVicky(true);
        }
      }}
    >
      <Heading as="h1" pb={6}>
        Login
      </Heading>
      <Input
        placeholder="Enter password"
        required
        ref={inputRef}
        type="password"
        mb={6}
      />
      <p className="mb">
        We launched a new site. Visit{" "}
        <a href="https://ratingmate.vercel.app" className="link">
          RateMate
        </a>
      </p>
      <Button colorScheme="vicky" w="100%" type="submit">
        Submit
      </Button>
    </Box>
  );
}

export default App;
