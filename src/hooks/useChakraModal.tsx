import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Text,
  Heading,
} from "@chakra-ui/react";
import { ChakraModal, Durations, Value } from "../utils/types";
import { useState } from "react";
import TaskTable from "../components/TaskTable";
import { getDuration } from "../utils/getDuration";
import { getTotal } from "../utils/getTotal";
import DatePicker from "react-date-picker";
import { CalendarIcon } from "@chakra-ui/icons";
import { durations } from "../data/durations";
import { getKeys } from "../utils/getKeys";
import { format } from "date-fns";

function useChakraModal(
  openModal: boolean,
  setOpenModal: (bool: boolean) => void,
  { title, type, buttonText, buttonCallback, tasksList }: ChakraModal
) {
  const durationsObject: Durations = {};
  durations.forEach((duration) => (durationsObject[duration] = 0));
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [value, onChange] = useState<Value>(null);
  const [localDurationsList, setLocalDurationsList] =
    useState<Durations>(durationsObject);

  const callback = () => {
    let success: boolean | string;
    switch (type) {
      case "form":
        success = buttonCallback(hours, minutes, seconds);
        if (success) {
          setHours(0);
          setMinutes(0);
          setSeconds(0);
        }
        break;
      case "table":
        success = buttonCallback(localDurationsList, value);
        if (success) {
          onChange(null);
          setLocalDurationsList(durationsObject);
        }
        break;
      default:
        console.error("Not a valid modal type");
    }
  };

  const handleChange = (value: Value) => {
    if (value instanceof Date && tasksList) {
      const tasksListKeys = getKeys(tasksList);
      const day = format(value, "PPPP");
      setLocalDurationsList(
        tasksListKeys.includes(day) ? tasksList[day].durations : durationsObject
      );
    }
    onChange(value);
  };

  const modal = () => {
    return (
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} isCentered>
        <ModalOverlay />
        <ModalContent bg="vicky.900">
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {type === "form" ? (
              <>
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
              </>
            ) : (
              <>
                <DatePicker
                  onChange={handleChange}
                  value={value}
                  calendarIcon={<CalendarIcon />}
                  clearIcon={null}
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="yyyy"
                  format="dd/MM/yy"
                  maxDate={new Date(Date.now() - 8.64e7)}
                />
                {value instanceof Date && (
                  <>
                    <Heading fontSize="xl" fontWeight={500} marginBlock={6}>
                      Total time: {getDuration(getTotal(localDurationsList))}
                    </Heading>
                    <TaskTable
                      durationsList={localDurationsList}
                      isCurrentDay={false}
                      setDurationsList={setLocalDurationsList}
                    />
                  </>
                )}
              </>
            )}
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
              onClick={callback}
              isDisabled={type === "table" ? !(value instanceof Date) : false}
            >
              {buttonText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  return { modal };
}

export { useChakraModal };
