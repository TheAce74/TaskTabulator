import { render, screen } from "@testing-library/react";
import MonthlyCumulative from "../MonthlyCumulative";

test("monthly cumulative should work as expected", () => {
  const tasksList = {
    "Friday, February 9th, 2024": {
      durations: { 80: 1, 110: 0, 120: 0 },
    },
    "Tuesday, January 9th, 2024": {
      durations: { 80: 0, 110: 1, 120: 0 },
    },
    "Friday, February 10th, 2023": {
      durations: { 80: 0, 110: 0, 120: 1 },
    },
    "Thursday, February 15th, 2024": {
      durations: { 80: 0, 110: 0, 120: 1 },
    },
  };
  render(<MonthlyCumulative tasksList={tasksList} />);
  const cumulative = screen.getByTestId("cumulative");
  expect(cumulative).toHaveTextContent("Monthly Cumulative: 3 mins 20 secs");
});
