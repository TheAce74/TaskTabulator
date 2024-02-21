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
} from "@chakra-ui/react";
import { getDuration } from "../utils/getDuration";
import { ChakraAlert, ChakraModal, Durations } from "../utils/types";
import { reminder } from "../utils/reminder";
import { useRef, useState } from "react";
import { useChakraAlert } from "../hooks/useChakraAlert";
import { useChakraModal } from "../hooks/useChakraModal";
import { getKeys } from "../utils/getKeys";
import { timeout } from "../utils/timeout";
import CustomCounter from "./CustomCounter";

type TaskTableProps = {
  durationsList: Durations;
  isCurrentDay: boolean;
  setDurationsList: (newDurationsList: Durations) => void;
};

export default function TaskTable({
  durationsList,
  isCurrentDay,
  setDurationsList,
}: TaskTableProps) {
  const [openAlert, setOpenAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const chakraAlertRef = useRef<ChakraAlert>({
    status: "success",
    title: "",
    message: "",
  });
  const chakraModalRef = useRef<ChakraModal>({
    title: "",
    type: "form",
    buttonText: "",
    buttonCallback: () => "",
  });
  const durationsListKeys = durationsList ? getKeys(durationsList) : [];

  const handleDurationsList = (
    id: number,
    type: "increment" | "decrement",
    count?: number
  ) => {
    const newDurationsList = Object.assign({}, durationsList);
    if (typeof count === "number") {
      newDurationsList[id] = count;
    } else if (type === "increment") {
      newDurationsList[id] = newDurationsList[id] + 1;
      if (isCurrentDay)
        reminder(newDurationsList, chakraAlertRef, () => setOpenAlert(true));
    } else {
      newDurationsList[id] =
        newDurationsList[id] - 1 < 0 ? 0 : newDurationsList[id] - 1;
    }
    setDurationsList(newDurationsList);
  };

  const handleAddCustomTime = (
    hours: number,
    minutes: number,
    seconds: number
  ) => {
    const duration = hours * 3600 + minutes * 60 + seconds;
    if (duration === 0) return false;
    if (durationsListKeys.includes(String(duration))) {
      chakraAlertRef.current = {
        status: "error",
        title: "Error!",
        message: "Task duration already exists",
      };
      setOpenAlert(true);
      timeout(() => setOpenAlert(false));
      return false;
    } else {
      const newDurationsList = Object.assign({}, durationsList);
      newDurationsList[duration] = 0;
      setDurationsList(newDurationsList);
      chakraAlertRef.current = {
        status: "success",
        title: "Success!",
        message: "Task duration added successfully",
      };
      setOpenAlert(true);
      timeout(() => setOpenAlert(false));
      setOpenModal(false);
      return true;
    }
  };

  const handleOpenModal = () => {
    chakraModalRef.current = {
      title: "Add Custom Time",
      type: "form",
      buttonText: "Add",
      buttonCallback: (hours: number, minutes: number, seconds: number) =>
        handleAddCustomTime(hours, minutes, seconds),
    };
    setOpenModal(true);
  };

  const { alert } = useChakraAlert(
    openAlert,
    setOpenAlert,
    chakraAlertRef.current
  );

  const { modal } = useChakraModal(
    openModal,
    setOpenModal,
    chakraModalRef.current
  );

  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="vicky.100">Task Duration</Th>
              <Th color="vicky.100">Counter</Th>
            </Tr>
          </Thead>
          <Tbody>
            {durationsListKeys.map((duration, index) => (
              <Tr key={duration}>
                <Td>{getDuration(Number(duration))}</Td>
                <Td>
                  <Box display="flex" gap={4} alignItems="center">
                    <Text data-testid={`display${index + 1}`}>
                      {durationsList[Number(duration)]}
                    </Text>
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
                    <CustomCounter
                      duration={duration}
                      handleDurationsList={handleDurationsList}
                    />
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {isCurrentDay && (
        <Button mt={6} onClick={handleOpenModal}>
          Add Custom Time
        </Button>
      )}
      {alert()}
      {modal()}
    </Box>
  );
}
