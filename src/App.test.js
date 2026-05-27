import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

test("uses copy-only email actions and omits impact statistics", () => {
  render(<App />);

  expect(screen.getAllByRole("button", { name: "Copy Email" })).toHaveLength(2);
  expect(document.querySelector('a[href^="mailto:"]')).not.toBeInTheDocument();
  expect(document.querySelector('a[href*="mail.google.com"]')).not.toBeInTheDocument();
  expect(screen.getByText("ryanrawat@gmail.com")).toBeInTheDocument();
  expect(screen.queryByText("10+")).not.toBeInTheDocument();
  expect(screen.getByText("Created by Aryan Rawat")).toBeInTheDocument();
});

test("copies the email independently from both contact buttons", async () => {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: jest.fn().mockResolvedValue(undefined) },
  });

  render(<App />);
  fireEvent.click(screen.getAllByRole("button", { name: "Copy Email" })[0]);

  await waitFor(() => {
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("ryanrawat@gmail.com");
    expect(screen.getAllByRole("button", { name: "Copied!" })).toHaveLength(1);
  });

  fireEvent.click(screen.getByRole("button", { name: "Copy Email" }));

  await waitFor(() => {
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(2);
    expect(screen.getAllByRole("button", { name: "Copied!" })).toHaveLength(2);
  });
});

test("renders education and credentials as balanced content cards", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "Stevens Institute of Technology" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Certifications" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Honors" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Relevant Coursework" })).toBeInTheDocument();
});
