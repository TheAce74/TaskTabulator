import { Button } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ChakraModal, Durations } from "../utils/types";
import { useChakraModal } from "../hooks/useChakraModal";
import { format } from "date-fns";

type PreviousTasksButtonProps = {
  setDurationsList: (newDurationsList: Durations, day?: string) => void;
};

export default function PreviousTasksButton({
  setDurationsList,
}: PreviousTasksButtonProps) {
  const [openModal, setOpenModal] = useState(false);
  const chakraModalRef = useRef<ChakraModal>({
    title: "",
    type: "table",
    buttonText: "",
    buttonCallback: () => "",
  });

  const handleOpenModal = () => {
    chakraModalRef.current = {
      title: "Add Previous Task",
      type: "table",
      buttonText: "Add",
      buttonCallback: (newDurationsList, today) => {
        if (today instanceof Date) {
          setDurationsList(newDurationsList, format(today, "PPPP"));
          setOpenModal(false);
          return true;
        }
        return false;
      },
    };
    setOpenModal(true);
  };

  const { modal } = useChakraModal(
    openModal,
    setOpenModal,
    chakraModalRef.current
  );

  return (
    <>
      <Button mb={8} onClick={handleOpenModal}>
        Add Previous Task
      </Button>
      {modal()}
    </>
  );
}
