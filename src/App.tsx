import { AbsoluteCenter, Box, Divider, Heading, Text } from "@chakra-ui/react";
import MessageGenerator from "./components/MessageGenerator";
import CurrentDayTask from "./components/CurrentDayTask";
import OtherDaysTasks from "./components/OtherDaysTasks";

function App() {
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
      <CurrentDayTask />
      <Box position="relative" py={8}>
        <Divider />
        <AbsoluteCenter bg="vicky.900" px="4">
          <Text align="center">Previous days tasks</Text>
        </AbsoluteCenter>
      </Box>
      <OtherDaysTasks />
    </Box>
  );
}

export default App;
