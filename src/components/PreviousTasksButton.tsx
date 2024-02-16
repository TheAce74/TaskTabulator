import { Button } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ChakraAlert, ChakraModal, Durations, Tasks } from "../utils/types";
import { useChakraModal } from "../hooks/useChakraModal";
import { format } from "date-fns";
import { useChakraAlert } from "../hooks/useChakraAlert";
import { timeout } from "../utils/timeout";

type PreviousTasksButtonProps = {
  setDurationsList: (newDurationsList: Durations, day?: string) => void;
  tasksList: Tasks;
};

export default function PreviousTasksButton({
  setDurationsList,
  tasksList,
}: PreviousTasksButtonProps) {
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const chakraModalRef = useRef<ChakraModal>({
    title: "",
    type: "table",
    buttonText: "",
    buttonCallback: () => "",
    tasksList: {},
  });
  const chakraAlertRef = useRef<ChakraAlert>({
    status: "success",
    title: "",
    message: "",
  });

  const handleOpenModal = () => {
    chakraModalRef.current = {
      title: "Add/Edit Previous Task",
      type: "table",
      buttonText: "Add",
      buttonCallback: (newDurationsList, today) => {
        if (today instanceof Date) {
          setDurationsList(newDurationsList, format(today, "PPPP"));
          chakraAlertRef.current = {
            status: "success",
            title: "Success!",
            message: "Task added successfully",
          };
          setOpenAlert(true);
          timeout(() => setOpenAlert(false));
          setOpenModal(false);
          return true;
        }
        return false;
      },
      tasksList: tasksList,
    };
    setOpenModal(true);
  };

  const { modal } = useChakraModal(
    openModal,
    setOpenModal,
    chakraModalRef.current
  );

  const { alert } = useChakraAlert(
    openAlert,
    setOpenAlert,
    chakraAlertRef.current
  );

  return (
    <>
      <Button mb={8} onClick={handleOpenModal}>
        Add/Edit Previous Task
      </Button>
      {modal()}
      {alert()}
    </>
  );
}
