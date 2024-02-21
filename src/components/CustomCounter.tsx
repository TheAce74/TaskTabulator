import {
  Box,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

type CustomCounterProps = {
  duration: string;
  handleDurationsList: (
    id: number,
    type: "increment" | "decrement",
    count?: number
  ) => void;
};

export default function CustomCounter({
  duration,
  handleDurationsList,
}: CustomCounterProps) {
  const [count, setCount] = useState(0);

  const addCustomCount = () => {
    handleDurationsList(Number(duration), "increment", count);
    setCount(0);
  };

  return (
    <Box display="flex" gap={4} alignItems="center">
      <NumberInput
        min={0}
        value={count}
        onChange={(value) => setCount(isNaN(Number(value)) ? 0 : Number(value))}
        minWidth="max-content"
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper bg="vicky.400" />
          <NumberDecrementStepper bg="vicky.600" />
        </NumberInputStepper>
      </NumberInput>
      <Button onClick={addCustomCount} minWidth="max-content">
        Set Counter
      </Button>
    </Box>
  );
}
