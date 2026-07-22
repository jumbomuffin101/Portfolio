import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("renders Aryan's name", () => {
  render(<App />);
  expect(document.querySelector(".hero-name-accent")).toHaveTextContent("Aryan Rawat");
  expect(
    screen.getByRole("heading", {
      name: "Hey, I’m Aryan Rawat.",
    })
  ).toBeInTheDocument();
  expect(
    screen.getByText("Software Engineer building AI systems, backend platforms, and full-stack products.")
  ).toBeInTheDocument();
  expect(
    screen.getByText("CS @ Stevens focused on production-grade APIs, LLM workflows, and data systems.")
  ).toBeInTheDocument();
});

test("uses consistent project type and domain eyebrow labels", () => {
  render(<App />);

  [
    "HACKATHON PROJECT / RECRUITING AI",
    "HACKATHON PROJECT / MULTI-AGENT AI",
    "FULL-STACK PROJECT / CLINICAL AI",
    "FULL-STACK PROJECT / TRAINING ANALYTICS",
    "FULL-STACK PROJECT / MARKET DATA",
    "OPEN SOURCE / DOCUMENT AI",
    "FULL-STACK AI / CAREER TECHNOLOGY",
    "AI AGENT / DEVELOPER PRODUCTIVITY",
  ].forEach((label) => {
    expect(screen.getByText(label)).toHaveClass("project-context");
  });
});

test("presents the selected projects with screenshot previews", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "RecruitIQ" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "ConsensusIQ" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "AI Clinical Ops Agent" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Gym-Risk" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Trading Analytics Dashboard" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "IBM Docling" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "OfferOS" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "OpsPilot" })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "Resume" })).not.toBeInTheDocument();
  expect(screen.getByAltText("RecruitIQ interface preview")).toHaveAttribute(
    "src",
    "/projects/recruitiq.png"
  );
  expect(screen.getByAltText("ConsensusIQ interface preview")).toHaveAttribute(
    "src",
    "/projects/consensusiq.png"
  );
  expect(screen.getByAltText("AI Clinical Ops Agent interface preview")).toHaveAttribute(
    "src",
    "/projects/ai-clinical-ops-agent.png"
  );
  expect(screen.getByAltText("IBM Docling interface preview")).toHaveAttribute(
    "src",
    "/projects/ibm-docling.png"
  );
  expect(screen.getByAltText("OfferOS interface preview")).toHaveAttribute(
    "src",
    "/projects/offeros.png"
  );
  expect(screen.getByAltText("OpsPilot interface preview")).toHaveAttribute(
    "src",
    "/projects/opspilot.png"
  );
});

test("shows the new project cards before all existing projects", () => {
  render(<App />);

  const titles = Array.from(document.querySelectorAll(".project-case h3")).map(
    (heading) => heading.textContent
  );

  expect(titles.slice(0, 3)).toEqual(["IBM Docling", "OfferOS", "OpsPilot"]);
});

test("renders the hero social actions as three icon-only controls", () => {
  render(<App />);

  const hero = document.querySelector(".hero");
  const heroActions = hero.querySelectorAll(".social-icon-button");

  expect(heroActions).toHaveLength(3);
  expect(hero.querySelector('button[aria-label="Copy email"]')).toBeInTheDocument();
  expect(hero.querySelector('a[aria-label="GitHub"]')).toBeInTheDocument();
  expect(hero.querySelector('a[aria-label="LinkedIn"]')).toBeInTheDocument();
  expect(hero.querySelector('a[aria-label="Resume"]')).not.toBeInTheDocument();
  expect(screen.queryByText("Product showcase")).not.toBeInTheDocument();
  expect(document.querySelectorAll(".social-icon-button")).toHaveLength(6);
});

test("places each project screenshot after its information and actions", () => {
  render(<App />);

  document.querySelectorAll(".project-case").forEach((projectCard) => {
    expect(projectCard.lastElementChild).toHaveClass("project-preview");
    expect(projectCard.querySelector(".project-header")).toBe(projectCard.firstElementChild);
  });
});

test("links the published project demos in new tabs", () => {
  render(<App />);

  const recruitProject = screen.getByRole("heading", { name: "RecruitIQ" }).closest("article");
  const consensusProject = screen.getByRole("heading", { name: "ConsensusIQ" }).closest("article");
  const aiProject = screen.getByRole("heading", { name: "AI Clinical Ops Agent" }).closest("article");
  const gymProject = screen.getByRole("heading", { name: "Gym-Risk" }).closest("article");
  const recruitLiveLink = recruitProject.querySelector('a[href="https://recruit-iq-five.vercel.app/"]');
  const recruitGithubLink = recruitProject.querySelector('a[href="https://github.com/jumbomuffin101/RecruitIQ"]');
  const consensusLiveLink = consensusProject.querySelector('a[href="https://consensus-iq.vercel.app/"]');
  const consensusGithubLink = consensusProject.querySelector('a[href="https://github.com/jumbomuffin101/consensus-iq"]');
  const aiLiveLink = aiProject.querySelector('a[href="https://ai-clinical-ops-agent.vercel.app/"]');
  const gymLiveLink = gymProject.querySelector('a[href="https://gym-risk-app.vercel.app/"]');
  const doclingProject = screen.getByRole("heading", { name: "IBM Docling" }).closest("article");
  const offerosProject = screen.getByRole("heading", { name: "OfferOS" }).closest("article");
  const opsPilotProject = screen.getByRole("heading", { name: "OpsPilot" }).closest("article");

  expect(recruitGithubLink).toHaveTextContent("GitHub");
  expect(recruitGithubLink).toHaveAttribute("target", "_blank");
  expect(recruitGithubLink).toHaveAttribute("rel", "noopener noreferrer");
  expect(recruitLiveLink).toHaveTextContent("Live");
  expect(recruitLiveLink).toHaveAttribute("target", "_blank");
  expect(recruitLiveLink).toHaveAttribute("rel", "noopener noreferrer");
  expect(consensusGithubLink).toHaveTextContent("GitHub");
  expect(consensusGithubLink).toHaveAttribute("target", "_blank");
  expect(consensusGithubLink).toHaveAttribute("rel", "noopener noreferrer");
  expect(consensusLiveLink).toHaveTextContent("Live");
  expect(consensusLiveLink).toHaveAttribute("target", "_blank");
  expect(consensusLiveLink).toHaveAttribute("rel", "noopener noreferrer");
  expect(aiLiveLink).toHaveTextContent("Live");
  expect(aiLiveLink).toHaveAttribute("target", "_blank");
  expect(aiLiveLink).toHaveAttribute("rel", "noopener noreferrer");
  expect(gymLiveLink).toHaveTextContent("Live");
  expect(gymLiveLink).toHaveAttribute("target", "_blank");
  expect(gymLiveLink).toHaveAttribute("rel", "noopener noreferrer");

  [
    [doclingProject, "https://github.com/docling-project/docling", "https://docling-project.github.io/docling/"],
    [offerosProject, "https://github.com/jumbomuffin101/offeros", "https://offeros-web-two.vercel.app/"],
    [opsPilotProject, "https://github.com/jumbomuffin101/opspilot", "https://opspilot-puce.vercel.app/"],
  ].forEach(([project, githubUrl, liveUrl]) => {
    const githubLink = project.querySelector(`a[href="${githubUrl}"]`);
    const liveLink = project.querySelector(`a[href="${liveUrl}"]`);

    expect(githubLink).toHaveTextContent("GitHub");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(liveLink).toHaveTextContent("Live");
    expect(liveLink).toHaveAttribute("target", "_blank");
    expect(liveLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});

test("uses email copy actions and omits stale impact statistics", () => {
  render(<App />);

  expect(screen.getAllByRole("button", { name: "Copy email" })).toHaveLength(2);
  expect(document.querySelector('a[href^="mailto:"]')).not.toBeInTheDocument();
  expect(document.querySelector('a[href*="mail.google.com"]')).not.toBeInTheDocument();
  expect(screen.getByText("ryanrawat@gmail.com")).toBeInTheDocument();
  expect(screen.queryByText("10+")).not.toBeInTheDocument();
  expect(screen.getByText("Created by Aryan Rawat")).toBeInTheDocument();
});

test("copies the email independently from both email buttons", async () => {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: jest.fn().mockResolvedValue(undefined) },
  });

  render(<App />);
  fireEvent.click(screen.getAllByRole("button", { name: "Copy email" })[0]);

  await waitFor(() => {
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("ryanrawat@gmail.com");
    expect(screen.getAllByText("Email copied to clipboard.")).toHaveLength(1);
    expect(document.querySelector(".social-icon-button-success")).toBeInTheDocument();
  });

  fireEvent.click(screen.getAllByRole("button", { name: "Copy email" })[1]);

  await waitFor(() => {
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(2);
    expect(screen.getAllByText("Email copied to clipboard.")).toHaveLength(2);
  });
});

test("renders education and credentials as balanced content cards", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "Stevens Institute of Technology" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Certifications" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Honors" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Relevant Coursework" })).toBeInTheDocument();
});

test("links the Research Assistant experience to its repository", () => {
  render(<App />);

  const researchRole = screen.getByRole("heading", { name: "Research Assistant" });
  const researchCard = researchRole.closest("article");
  const repoLink = researchCard.querySelector(
    'a[href="https://github.com/jumbomuffin101/AI-Research-ConceptMapAnalysis"]'
  );

  expect(repoLink).toHaveTextContent("View Research Repo");
  expect(repoLink).toHaveAttribute("target", "_blank");
  expect(repoLink).toHaveAttribute("rel", "noopener noreferrer");
});

test("presents the engineering stack as categorized technology cards", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "Stack" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Frontend Engineering" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Backend Engineering" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "AI / Machine Learning" })).toBeInTheDocument();
  expect(screen.getByText("Human-Centered AI")).toBeInTheDocument();
  expect(screen.getAllByText("Amazon Aurora PostgreSQL").length).toBeGreaterThan(0);
  expect(screen.getAllByText("Azure AI Search").length).toBeGreaterThan(0);

  const expectedCategories = [
    ["01", "Languages"],
    ["02", "Frontend Engineering"],
    ["03", "Backend Engineering"],
    ["04", "Databases & Data"],
    ["05", "AI / Machine Learning"],
    ["06", "Cloud / DevOps / Infrastructure"],
  ];

  document.querySelectorAll(".skill-card").forEach((card, index) => {
    expect(card.querySelector(".skill-index")).toHaveTextContent(expectedCategories[index][0]);
    expect(card.querySelector("h3")).toHaveTextContent(expectedCategories[index][1]);
  });
});

test("shows the resume-based core stack in one hero tools row", () => {
  render(<App />);

  const heroTools = document.querySelector(".hero .floating-stack");
  expect(Array.from(heroTools.children).map((chip) => chip.textContent)).toEqual([
    "Python",
    "TypeScript",
    "FastAPI",
    "Next.js",
    "PostgreSQL",
    "Docker",
    "AWS",
  ]);
});

test("omits the Lab section and its navigation target", () => {
  render(<App />);

  expect(screen.queryByRole("heading", { name: "Lab" })).not.toBeInTheDocument();
  expect(document.querySelector('a[href="#lab"]')).not.toBeInTheDocument();
});
