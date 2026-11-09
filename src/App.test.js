import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { readFileSync } from "fs";
import path from "path";
import App from "./App";
import { moreProjects, projects } from "./data/portfolio";

// The motion driver has its own regression suite; App tests exercise its UI.
jest.mock("./components/InteractionSystem", () => ({
  __esModule: true,
  default: () => null,
}));

let reduced;
beforeEach(() => {
  reduced = true;
  localStorage.clear();
  window.history.replaceState(null, "", "/");
  window.matchMedia = jest.fn((query) => ({
    matches: reduced && query.includes("prefers-reduced-motion"),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
});

test("introduces Aryan with the portrait and keeps it visible with reduced motion", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1, name: "Hi, I'm Aryan." })).toBeVisible();
  expect(screen.getByText("I build software.")).toBeVisible();
  expect(screen.getByText("Incoming Software Engineer Intern @ JPMorgan Chase")).toBeVisible();
  expect(screen.getByRole("link", { name: "View Projects" })).toHaveAttribute("href", "#projects");
  expect(screen.getByRole("img", { name: "Portrait of Aryan Rawat" })).toHaveAttribute(
    "src", `${process.env.PUBLIC_URL || ""}/headshot.jpg`,
  );
  expect(document.querySelector("canvas")).not.toBeInTheDocument();
  expect(document.documentElement.dataset.motion).toBe("reduced");
});

test("features four concise projects with authentic previews and valid link targets", () => {
  render(<App />);
  const selected = screen.getByRole("region", { name: "Projects", exact: true });
  const articles = within(selected).getAllByRole("article");
  expect(articles.map((article) => within(article).getByRole("heading").textContent)).toEqual([
    "Next Chapter", "IBM Docling", "OfferOS", "OpsPilot",
  ]);
  articles.forEach((article, index) => {
    const project = projects[index];
    expect(within(article).getByRole("img", { name: project.alt })).toHaveAttribute(
      "src", `${process.env.PUBLIC_URL || ""}/projects/${project.image}`,
    );
    expect(within(article).getByRole("list", { name: "Technologies" }).children.length).toBeLessThanOrEqual(3);
    expect(within(article).getByRole("link", { name: `${project.title} on GitHub` })).toHaveAttribute("href", project.github);
    if (project.live) {
      expect(within(article).getByRole("link", { name: `${project.title} live site` })).toHaveAttribute("href", project.live);
    }
  });
  expect(within(articles[0]).getByRole("link", { name: "Next Chapter on GitHub" })).toHaveAttribute("href", "https://github.com/jumbomuffin101/Next-Chapter");
  expect(within(articles[1]).getByText(/merged fix prevents a Windows file handle leak/)).toBeVisible();
  expect(within(articles[2]).getByRole("link", { name: "OfferOS live site" }).getAttribute("href")).toMatch(/^https:\/\/offeros-web-two\.vercel\.app\/sign-in\?/);
  expect(selected).not.toHaveTextContent(/private repository|engineering map|access required/i);
});

test("keeps all five additional projects and their destinations", () => {
  render(<App />);
  const archive = screen.getByRole("region", { name: "More Projects" });
  expect(within(archive).getAllByRole("listitem")).toHaveLength(5);
  moreProjects.forEach(({ title, github, live }) => {
    expect(within(archive).getByRole("link", { name: `${title} on GitHub` })).toHaveAttribute("href", github);
    expect(within(archive).getByRole("link", { name: `${title} live site` })).toHaveAttribute("href", live);
  });
});

test("mobile menu follows anchors and closes on Escape with focus restored", () => {
  render(<App />);
  const toggle = screen.getByRole("button", { name: "Menu" });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  const projectsLink = within(screen.getByRole("navigation")).getByRole("link", { name: "Projects" });
  expect(projectsLink).toHaveAttribute("href", "#projects");
  projectsLink.addEventListener("click", (event) => event.preventDefault(), { once: true });
  fireEvent.click(projectsLink);
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(toggle);
  fireEvent.keyDown(window, { key: "Escape" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(toggle).toHaveFocus();
});

test("presents the six chapters in order and highlights the chapter being read", async () => {
  render(<App />);
  const sections = [...screen.getByRole("main").children];
  expect(sections.map(({ id }) => id)).toEqual(["home", "about", "projects", "experience", "education", "contact"]);
  const links = within(screen.getByRole("navigation")).getAllByRole("link");
  expect(links.map((link) => [link.textContent, link.hash])).toEqual([
    ["About", "#about"], ["Projects", "#projects"], ["Experience", "#experience"], ["Contact", "#contact"],
  ]);
  const boxes = sections.map((section, index) => jest.spyOn(section, "getBoundingClientRect").mockReturnValue({ top: (index - 2) * 600 }));
  try {
    fireEvent.scroll(window);
    await waitFor(() => expect(links[1]).toHaveAttribute("aria-current", "location"));
    boxes.forEach((box, index) => box.mockReturnValue({ top: (index - 4) * 600 }));
    fireEvent.scroll(window);
    await waitFor(() => expect(links.every((link) => !link.hasAttribute("aria-current"))).toBe(true));
  } finally {
    boxes.forEach((box) => box.mockRestore());
  }
});

test("the hero and contact provide no public document downloads", () => {
  render(<App />);
  expect(document.querySelector('a[download], a[href$=".pdf" i]')).toBeNull();
  const contact = screen.getByRole("region", { name: "Let's connect." });
  expect(within(contact).getAllByRole("link").map((link) => link.textContent.trim())).toEqual([
    "arawat3@stevens.edu", "GitHub ↗", "LinkedIn ↗",
  ]);
});

test("displays the incoming role first and reflects the new employment dates and teaching count", () => {
  render(<App />);
  const rows = within(screen.getByRole("region", { name: "Experience" })).getAllByRole("listitem");
  [
    ["JPMorgan Chase & Co.", "Incoming Software Engineer Intern", "Jun–Aug 2027"],
    ["Stevens Institute of Technology", "Course Assistant", "Sep 2026–Present"],
    ["Stevens Institute for Artificial Intelligence (SIAI)", "Research Assistant", "Jun–Aug 2026"],
    ["GENIE AI", "Software Engineer Intern", "Jun–Aug 2026"],
    ["TruClaim", "Software Engineer Intern", "Jun–Aug 2025"],
  ].forEach(([company, role, date], index) => {
    expect(within(rows[index]).getByRole("heading", { name: company })).toBeVisible();
    expect(rows[index]).toHaveTextContent(role);
    expect(rows[index]).toHaveTextContent(date);
  });
  expect(rows[1]).toHaveTextContent("40+ students");
  expect(rows[3]).toHaveTextContent("15 to 2 minutes");
  expect(rows[4]).toHaveTextContent("reducing validation errors by 22%");
});

test("keeps the compact skills, education, AWS certifications and recruiting links", () => {
  render(<App />);
  const tech = screen.getByRole("region", { name: "About me." });
  expect(within(tech).getByText("At Stevens, I study computer science with a minor in applied mathematics. I’m interested in backend systems and AI tools, from job search software to tools for reviewing clinical concept maps.")).toBeVisible();
  expect(tech).toHaveTextContent("PostgreSQL, SQLAlchemy, Prisma");
  expect(screen.queryByRole("region", { name: "Technologies" })).not.toBeInTheDocument();
  expect(within(tech).queryByRole("button")).not.toBeInTheDocument();
  const education = screen.getByRole("region", { name: "Education" });
  ["B.S. Computer Science", "Minor in Applied Mathematics", "Expected December 2027", "3.7 GPA",
    "AWS Cloud Practitioner (2025)", "AWS AI Practitioner (2026)"].forEach((term) => expect(education).toHaveTextContent(term));
  const contact = screen.getByRole("region", { name: "Let's connect." });
  expect(within(contact).getByRole("link", { name: "arawat3@stevens.edu" })).toHaveAttribute("href", "mailto:arawat3@stevens.edu");
  expect(within(contact).getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/jumbomuffin101");
  expect(within(contact).getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/aryan-rawat-bbb0a6276/");
});

test("Docling uses a real PNG with dimensions matching the native screenshot", () => {
  render(<App />);
  const img = within(screen.getByRole("article", { name: "IBM Docling" })).getByRole("img");
  const png = readFileSync(path.join(__dirname, "../public/projects/ibm-docling.png"));
  expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  expect(Number(img.width)).toBe(png.readUInt32BE(16));
  expect(Number(img.height)).toBe(png.readUInt32BE(20));
});

test("the screenshot dialog keeps the native image and restores focus on close", () => {
  HTMLDialogElement.prototype.showModal = jest.fn(function () { this.setAttribute("open", ""); });
  render(<App />);
  for (const project of projects) {
    const button = screen.getByRole("button", { name: `Enlarge ${project.title} screenshot` });
    fireEvent.click(button);
    const dialog = screen.getByRole("dialog", { name: project.title });
    expect(dialog).toHaveAttribute("data-lenis-prevent");
    expect(within(dialog).getByRole("img", { name: project.alt })).toBeVisible();
    fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));
    expect(button).toHaveFocus();
    expect(dialog).not.toBeInTheDocument();
  }
});

test("shared anchor URLs restore focus after React mounts", async () => {
  const original = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = jest.fn();
  window.history.replaceState(null, "", "#education");
  try {
    render(<App />);
    await waitFor(() => expect(screen.getByRole("region", { name: "Education" })).toHaveFocus());
  } finally { Element.prototype.scrollIntoView = original; }
});

test("theme switching works and chapter tracking and visibility listeners clean up", () => {
  const remove = jest.spyOn(document, "removeEventListener");
  const removeWindow = jest.spyOn(window, "removeEventListener");
  const { unmount } = render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
  expect(localStorage.getItem("theme")).toBe("light");
  expect(document.documentElement.dataset.theme).toBe("light");
  act(() => unmount());
  expect(removeWindow).toHaveBeenCalledWith("scroll", expect.any(Function));
  expect(remove).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
  remove.mockRestore();
  removeWindow.mockRestore();
});
