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
} from "@chakra-ui/react";
import { ChakraModal } from "../utils/types";
import { useState } from "react";

function useChakraModal(
  openModal: boolean,
  setOpenModal: (bool: boolean) => void,
  { title, type, buttonText, buttonCallback }: ChakraModal
) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

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
        break;
      default:
        console.error("Not a valid modal type");
    }
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
            ) : null}
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
