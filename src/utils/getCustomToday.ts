import { format } from "date-fns";

const getCustomToday = () => {
  const today = new Date();
  if (today.getHours() === 0) {
    return format(Date.now() - 3.6e6, "PPPP");
  } else {
    return format(today, "PPPP");
  }
};

export { getCustomToday };
