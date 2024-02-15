import { Text } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function MessageGenerator() {
  const messageLibrary = useMemo(
    () => [
      "I love you",
      "I miss you",
      "I wish you were here",
      "My heart belongs to you",
      "All that I do, I do for you",
      "Thinking about you",
      "My world revolves around you",
      "You are mine and I am yours",
      "You are perfect for me",
      "I will always be there for you",
      "I miss the taste of your lips, the scent of your hair, the feel of your skin.",
      "When I look into your eyes, I just know we are meant to be",
      "Life would be impossible without you",
      "You make me happy",
      "You are all that I need and will ever need",
      "Ours is a love so real, so true, so deep...",
      "I treasure every moment we spent together",
      "You are special",
      "You are mine to love and care for",
      "I appreciate you",
      "Without you, my world is empty",
      "Soulmate🤍✨",
    ],
    []
  );
  const [message, setMessage] = useState(messageLibrary[0]);
  const intervalRef = useRef<number | null | NodeJS.Timeout>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messageLibrary.length);
      setMessage(messageLibrary[randomIndex]);
    }, 10000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [messageLibrary]);

  return (
    <Text fontSize="xl" pl={1}>
      {message}
    </Text>
  );
}
