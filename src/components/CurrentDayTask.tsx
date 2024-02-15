import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { durations } from "../data/durations";
import { getDuration } from "../utils/getDuration";
import { useEffect, useRef, useState } from "react";
import { ChakraAlert, Tasks } from "../utils/types";
import { getItem, setItem } from "../utils/localStorage";
import { getTotal } from "../utils/getTotal";
import { getCustomToday } from "../utils/getCustomToday";
import { useChakraAlert } from "../hooks/useChakraAlert";

export default function CurrentDayTask() {
  const [durationsList, setDurationsList] = useState<Record<number, number>>(
    {}
  );
  const [openModal, setOpenModal] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const chakraAlertRef = useRef<ChakraAlert>({
    status: "success",
    title: "",
    message: "",
  });

  const reminder = () => {
    if (getTotal(durationsList) % 7200 === 0 && getTotal(durationsList) !== 0) {
      chakraAlertRef.current = {
        status: "success",
        title: "Reminder!",
        message: "Try to get some rest and eat well my love 💖",
      };
      setOpenAlert(true);
    }
  };

  const handleDurationsList = (id: number, type: "increment" | "decrement") => {
    const newDurationsList = Object.assign({}, durationsList);
    if (type === "increment") {
      newDurationsList[id] = newDurationsList[id] + 1;
      reminder();
    } else {
      newDurationsList[id] =
        newDurationsList[id] - 1 < 0 ? 0 : newDurationsList[id] - 1;
    }
    const tasks = getItem("vicky") as Tasks;
    const today = getCustomToday();
    if (tasks) {
      const updatedTasks = Object.assign({}, tasks, {
        [today]: {
          durations: newDurationsList,
        },
      });
      setItem("vicky", updatedTasks);
    } else {
      const tasks = {
        [today]: {
          durations: newDurationsList,
        },
      };
      setItem("vicky", tasks);
    }
    setDurationsList(newDurationsList);
  };

  const handleAddCustomTime = () => {
    const duration = hours * 3600 + minutes * 60 + seconds;
    if (duration === 0) return;
    if (Object.keys(durationsList).includes(String(duration))) {
      chakraAlertRef.current = {
        status: "error",
        title: "Error!",
        message: "Task duration already exists",
      };
      setOpenAlert(true);
      const timeout = setTimeout(() => {
        setOpenAlert(false);
        clearTimeout(timeout);
      }, 5000);
    } else {
      const newDurationsList = Object.assign({}, durationsList);
      newDurationsList[duration] = 0;
      const tasks = getItem("vicky") as Tasks;
      const today = getCustomToday();
      if (tasks) {
        const updatedTasks = Object.assign({}, tasks, {
          [today]: {
            durations: newDurationsList,
          },
        });
        setItem("vicky", updatedTasks);
      } else {
        const tasks = {
          [today]: {
            durations: newDurationsList,
          },
        };
        setItem("vicky", tasks);
      }
      setDurationsList(newDurationsList);
      chakraAlertRef.current = {
        status: "success",
        title: "Success!",
        message: "Task duration added successfully",
      };
      setOpenAlert(true);
      const timeout = setTimeout(() => {
        setOpenAlert(false);
        clearTimeout(timeout);
      }, 5000);
      setOpenModal(false);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
  };

  useEffect(() => {
    let durationsObject: Record<number, number>;
    const tasks = getItem("vicky") as Tasks;
    const today = getCustomToday();
    if (tasks && today in tasks) {
      durationsObject = tasks[today].durations;
    } else {
      durationsObject = {};
      durations.forEach((duration) => (durationsObject[duration] = 0));
    }
    setDurationsList(durationsObject);
  }, []);

  const { alert } = useChakraAlert(
    openAlert,
    setOpenAlert,
    chakraAlertRef.current
  );

  return (
    <Box>
      <Heading fontSize="2xl" fontWeight={500} mb={6}>
        Total time today: {getDuration(getTotal(durationsList))}
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="vicky.100">Task Duration</Th>
              <Th color="vicky.100">Counter</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(durationsList).map((duration) => (
              <Tr key={duration}>
                <Td>{getDuration(Number(duration))}</Td>
                <Td>
                  <Box display="flex" gap={4} alignItems="center">
                    <Text>{durationsList[Number(duration)]}</Text>
                    <Button
                      bg="vicky.600"
                      color="vicky.100"
                      height={0}
                      paddingBlock={4}
                      paddingInline={6}
                      _hover={{
                        opacity: 0.6,
                      }}
                      _active={{
                        backgroundColor: "vicky.500",
                        scale: 0.9,
                      }}
                      onClick={() =>
                        handleDurationsList(Number(duration), "decrement")
                      }
                    >
                      -
                    </Button>
                    <Button
                      bg="vicky.400"
                      color="vicky.100"
                      height={0}
                      paddingBlock={4}
                      paddingInline={6}
                      _hover={{
                        opacity: 0.6,
                      }}
                      _active={{
                        backgroundColor: "vicky.300",
                        scale: 0.9,
                      }}
                      onClick={() =>
                        handleDurationsList(Number(duration), "increment")
                      }
                    >
                      +
                    </Button>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Button mt={6} onClick={() => setOpenModal(true)}>
        Add Custom Time
      </Button>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} isCentered>
        <ModalOverlay />
        <ModalContent bg="vicky.900">
          <ModalHeader>Add Custom Time</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" gap={4} alignItems="center" mb={5}>
              <Text fontWeight={500}>Hours:</Text>
              <NumberInput
                value={hours}
                onChange={(value) =>
                  setHours(
                    Number(value) > 23
                      ? 23
                      : isNaN(Number(value))
                      ? 0
                      : Number(value)
                  )
                }
                min={0}
                max={23}
                flex={1}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper bg="vicky.400" />
                  <NumberDecrementStepper bg="vicky.600" />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Box display="flex" gap={4} alignItems="center" mb={5}>
              <Text fontWeight={500}>Minutes:</Text>
              <NumberInput
                value={minutes}
                onChange={(value) =>
                  setMinutes(
                    Number(value) > 59
                      ? 59
                      : isNaN(Number(value))
                      ? 0
                      : Number(value)
                  )
                }
                min={0}
                max={59}
                flex={1}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper bg="vicky.400" />
                  <NumberDecrementStepper bg="vicky.600" />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Box display="flex" gap={4} alignItems="center">
              <Text fontWeight={500}>Seconds:</Text>
              <NumberInput
                value={seconds}
                onChange={(value) =>
                  setSeconds(
                    Number(value) > 59
                      ? 59
                      : isNaN(Number(value))
                      ? 0
                      : Number(value)
                  )
                }
                min={0}
                max={59}
                flex={1}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper bg="vicky.400" />
                  <NumberDecrementStepper bg="vicky.600" />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="vicky"
              mr={3}
              onClick={() => setOpenModal(false)}
            >
              Close
            </Button>
            <Button
              bg="vicky.400"
              color="vicky.100"
              _hover={{
                backgroundColor: "vicky.300",
              }}
              _active={{
                backgroundColor: "vicky.300",
                scale: 0.9,
              }}
              onClick={handleAddCustomTime}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {alert()}
    </Box>
  );
}
