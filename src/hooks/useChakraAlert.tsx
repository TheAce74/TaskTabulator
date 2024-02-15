import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import { ChakraAlert } from "../utils/types";

function useChakraAlert(
  openAlert: boolean,
  setOpenAlert: (bool: boolean) => void,
  { status, title, message }: ChakraAlert
) {
  const alert = () =>
    openAlert && (
      <Alert
        status={status}
        position="fixed"
        top={0}
        right={0}
        bg={status === "error" ? "vicky.500" : "vicky.400"}
        display="flex"
        gap={4}
        alignItems="center"
        justifyContent="space-between"
        zIndex={99999999999}
      >
        <Box display="flex" gap={4} alignItems="center">
          <AlertIcon />
          <Box>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Box>
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={() => setOpenAlert(false)}
        />
      </Alert>
    );
  return { alert };
}

export { useChakraAlert };
