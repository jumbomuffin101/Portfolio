import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Aryan's name", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /aryan rawat/i })).toBeInTheDocument();
});
