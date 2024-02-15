export type Day = {
  durations: {
    [key: number]: number;
  };
};

export type Tasks = {
  [date: string]: Day;
};

export type ChakraAlert = {
  status: "success" | "error";
  title: string;
  message: string;
};
