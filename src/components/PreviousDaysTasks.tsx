import { format } from "date-fns/format";
import { Tasks } from "../utils/types";
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
import { getKeys } from "../utils/getKeys";

type PreviousDaysTasksProps = {
  tasksList: Tasks;
};

export default function PreviousDaysTasks({
  tasksList,
}: PreviousDaysTasksProps) {
  const taskListKeys = getKeys(tasksList);

  return taskListKeys.length === 0 ||
    (taskListKeys.length === 1 &&
      taskListKeys.includes(format(new Date(), "PPPP"))) ? (
    <Text align="center" fontSize="3xl" fontWeight={500}>
      No Previous Tasks
    </Text>
  ) : (
    <Accordion defaultIndex={[0]} allowMultiple>
      {taskListKeys
        .map((day) => parse(day, "PPPP", new Date()))
        .sort(compareDesc)
        .slice(1)
        .map((day) => {
          const formattedDay = format(day, "PPPP");
          return (
            <AccordionItem key={formattedDay}>
              <h2>
                <AccordionButton _expanded={{ bg: "vicky.400" }}>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={600}
                    fontSize="2xl"
                  >
                    {formattedDay}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <List spacing={3}>
                  <Heading as="h3" fontSize="large" fontWeight={500} mb={3}>
                    Total time worked:{" "}
                    {getDuration(getTotal(tasksList[formattedDay].durations))}
                  </Heading>
                  {getKeys(tasksList[formattedDay].durations).map(
                    (duration) => {
                      if (
                        tasksList[formattedDay].durations[Number(duration)] !==
                        0
                      ) {
                        return (
                          <ListItem
                            key={formattedDay + duration}
                            display="flex"
                            gap={2}
                            alignItems="center"
                          >
                            <ListIcon as={CalendarIcon} color="vicky.600" />
                            <Text>{getDuration(Number(duration))}: </Text>
                            <Text>
                              {
                                tasksList[formattedDay].durations[
                                  Number(duration)
                                ]
                              }
                            </Text>
                          </ListItem>
                        );
                      } else return null;
                    }
                  )}
                </List>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
    </Accordion>
  );
}
