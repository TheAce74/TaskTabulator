export type Durations = Record<number, number>;

export type Day = {
  durations: Durations;
};

export type Tasks = Record<string, Day>;

export type ChakraAlert = {
  status: "success" | "error";
  title: string;
  message: string;
};

export type ChakraModal = {
  title: string;
  type: "form" | "table" | "";
  buttonText: string;
  buttonCallback: (
    hours: number,
    minutes: number,
    seconds: number
  ) => boolean | "";
};
