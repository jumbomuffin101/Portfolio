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

test("uses the updated hero contact actions and omits impact statistics", () => {
  render(<App />);

  const emailLink = screen.getByRole("link", { name: "Email Aryan Rawat" });
  expect(emailLink.tagName).toBe("A");
  expect(emailLink).toHaveAttribute("href", "mailto:ryanrawat@gmail.com");
  expect(emailLink).toHaveAttribute("target", "_self");
  expect(screen.getByRole("button", { name: "Copy email" })).toBeInTheDocument();
  expect(screen.getByText("ryanrawat@gmail.com")).toBeInTheDocument();
  expect(screen.queryByText("10+")).not.toBeInTheDocument();
  expect(screen.getByText("Created by Aryan Rawat")).toBeInTheDocument();
});

test("confirms when the hero email address is copied", async () => {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: jest.fn().mockResolvedValue(undefined) },
  });

  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Copy email" }));

  await waitFor(() => {
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("ryanrawat@gmail.com");
    expect(screen.getByRole("status")).toHaveTextContent("Copied");
  });
});

test("renders education and credentials as balanced content cards", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "Stevens Institute of Technology" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Certifications" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Honors" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Relevant Coursework" })).toBeInTheDocument();
});
