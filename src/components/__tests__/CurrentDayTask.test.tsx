import { fireEvent, render, screen } from "@testing-library/react";
import CurrentDayTask from "../CurrentDayTask";

test("current day task should render and counters should be working", () => {
  render(<CurrentDayTask />);
  const display = screen.getByTestId("display1");
  const decrement = screen.getByTestId("decrement1");
  const increment = screen.getByTestId("increment1");
  expect(display).toHaveTextContent("0");

  fireEvent.click(increment);
  expect(display).toHaveTextContent("1");

  fireEvent.click(decrement);
  expect(display).toHaveTextContent("0");
});
