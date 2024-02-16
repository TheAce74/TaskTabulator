export type Durations = Record<number, number>;

export type Day = {
  durations: Durations;
};

export type Tasks = Record<string, Day>;

export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type ChakraAlert = {
  status: "success" | "error";
  title: string;
  message: string;
};

export type ChakraModalForm = {
  title: string;
  type: "form";
  buttonText: string;
  buttonCallback: (
    hours: number,
    minutes: number,
    seconds: number
  ) => boolean | "";
};

export type ChakraModalTable = {
  title: string;
  type: "table";
  buttonText: string;
  buttonCallback: (newDurationsList: Durations, value: Value) => boolean | "";
};

export type ChakraModal = ChakraModalForm | ChakraModalTable;
