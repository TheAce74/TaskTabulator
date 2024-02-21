import { render, screen } from "@testing-library/react";
import MonthlyCumulative from "../MonthlyCumulative";

test("monthly cumulative should work as expected", () => {
  //since we're working with current dates, this test must be updated in the future as it may fail otherwise - at the time of testing the date is 21/02/2024 so the test passed
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
    "Tuesday, February 20th, 2024": {
      durations: { 600: 1 },
    },
  };
  render(<MonthlyCumulative tasksList={tasksList} />);
  const cumulative = screen.getByTestId("cumulative");
  expect(cumulative).toHaveTextContent(
    "Monthly Cumulative (20th till 19th): 10 mins"
  );
});
