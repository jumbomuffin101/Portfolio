import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Aryan's name", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /aryan rawat/i })).toBeInTheDocument();
});

test("presents the selected projects without a resume download", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "AI Clinical Ops Agent" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Gym-Risk" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Trading Analytics Dashboard" })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /resume/i })).not.toBeInTheDocument();
});
