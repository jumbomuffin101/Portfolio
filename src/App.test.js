import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("renders Aryan's name", () => {
  render(<App />);
  expect(screen.getAllByText("Aryan Rawat")).toHaveLength(2);
  expect(
    screen.getByRole("heading", {
      name: "I build AI-powered systems, backend platforms, and full-stack products that turn messy workflows into usable software.",
    })
  ).toBeInTheDocument();
});

test("presents the selected projects without a resume download", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "AI Clinical Ops Agent" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Gym-Risk" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Trading Analytics Dashboard" })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /resume/i })).not.toBeInTheDocument();
});

test("links the published project demos in new tabs", () => {
  render(<App />);

  const aiProject = screen.getByRole("heading", { name: "AI Clinical Ops Agent" }).closest("article");
  const gymProject = screen.getByRole("heading", { name: "Gym-Risk" }).closest("article");
  const aiLiveLink = aiProject.querySelector('a[href="https://ai-clinical-ops-agent.vercel.app/"]');
  const gymLiveLink = gymProject.querySelector('a[href="https://gym-risk-app.vercel.app/"]');

  expect(aiLiveLink).toHaveTextContent("Live");
  expect(aiLiveLink).toHaveAttribute("target", "_blank");
  expect(aiLiveLink).toHaveAttribute("rel", "noopener noreferrer");
  expect(gymLiveLink).toHaveTextContent("Live");
  expect(gymLiveLink).toHaveAttribute("target", "_blank");
  expect(gymLiveLink).toHaveAttribute("rel", "noopener noreferrer");
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
    expect(screen.getByRole("button", { name: "Copied!" })).toHaveClass("button-success");
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

test("presents the engineering stack as categorized technology cards", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "Technologies & Engineering Stack" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Frontend Engineering" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Backend Engineering" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "AI / Machine Learning" })).toBeInTheDocument();
  expect(screen.getByText("Human-Centered AI")).toBeInTheDocument();
});

test("adds the engineering lab section with personal building themes", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "What I Like Building" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Reliable AI Pipelines" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Backend Systems" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Product Dashboards" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Performance + Reliability" })).toBeInTheDocument();
});
