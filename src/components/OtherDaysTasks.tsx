import { format } from "date-fns/format";
import { getItem } from "../utils/localStorage";
import { Tasks } from "../utils/types";
import { useEffect, useState } from "react";
import {
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  List,
  ListItem,
  ListIcon,
  Heading,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { getDuration } from "../utils/getDuration";
import { getTotal } from "../utils/getTotal";
import { compareDesc, parse } from "date-fns";

export default function OtherDaysTasks() {
  const [tasksList, setTasksList] = useState<Tasks>({});

  useEffect(() => {
    const tasks = getItem("vicky") as Tasks;
    if (tasks) setTasksList(tasks);
  }, []);

  return Object.keys(tasksList).length === 0 ||
    (Object.keys(tasksList).length === 1 &&
      Object.keys(tasksList).includes(format(new Date(), "PPPP"))) ? (
    <Text align="center" fontSize="3xl" fontWeight={500}>
      No Previous Tasks
    </Text>
  ) : (
    <Accordion defaultIndex={[0]} allowMultiple>
      {Object.keys(tasksList)
        .map((day) => parse(day, "PPPP", new Date()))
        .sort(compareDesc)
        .map((day) => format(day, "PPPP"))
        .slice(1)
        .map((day) => (
          <AccordionItem key={day}>
            <h2>
              <AccordionButton _expanded={{ bg: "vicky.400" }}>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontWeight={600}
                  fontSize="2xl"
                >
                  {day}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List spacing={3}>
                <Heading as="h3" fontSize="large" fontWeight={500} mb={3}>
                  Total time worked:{" "}
                  {getDuration(getTotal(tasksList[day].durations))}
                </Heading>
                {Object.keys(tasksList[day].durations).map((duration) => {
                  if (tasksList[day].durations[Number(duration)] !== 0) {
                    return (
                      <ListItem
                        key={day + duration}
                        display="flex"
                        gap={2}
                        alignItems="center"
                      >
                        <ListIcon as={CalendarIcon} color="vicky.600" />
                        <Text>{getDuration(Number(duration))}: </Text>
                        <Text>
                          {tasksList[day].durations[Number(duration)]}
                        </Text>
                      </ListItem>
                    );
                  } else return null;
                })}
              </List>
            </AccordionPanel>
          </AccordionItem>
        ))}
    </Accordion>
  );
}
