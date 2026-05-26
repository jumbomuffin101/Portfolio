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

test("uses the updated contact email and omits impact statistics", () => {
  render(<App />);

  const emailLinks = screen.getAllByRole("link", { name: "Email" });
  expect(emailLinks).toHaveLength(2);
  emailLinks.forEach((link) => {
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "mailto:ryanrawat@gmail.com");
    expect(link).not.toHaveAttribute("aria-disabled");
  });
  expect(screen.queryByText("10+")).not.toBeInTheDocument();
  expect(screen.getByText("Created by Aryan Rawat")).toBeInTheDocument();
});

test("renders education and credentials as balanced content cards", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "Stevens Institute of Technology" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Certifications" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Honors" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Relevant Coursework" })).toBeInTheDocument();
});
