import { render, screen } from "@testing-library/react";
import TaskTable from "../TaskTable";

test("current day task should render and counts should be displayed", () => {
  const durationsList = { 80: 0, 110: 0, 120: 0 };
  render(
    <TaskTable
      durationsList={durationsList}
      isCurrentDay={true}
      setDurationsList={() => durationsList[80] + 1}
    />
  );
  const display = screen.getByTestId("display1");
  expect(display).toHaveTextContent("0");
});
