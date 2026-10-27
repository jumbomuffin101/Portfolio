import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import App from "./App";
import { projects } from "./data/portfolio";
import { disciplines } from "./data/disciplines";
import ResumeAction, { resumeHref } from "./components/ResumeAction";
import { readFileSync } from "fs";
import path from "path";

jest.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: { name: "scrollTrigger" } }));

// Animation rendering is exercised in the real browser; these tests cover user flows.
jest.mock("./components/InteractionSystem", () => ({
  __esModule: true,
  default: () => null,
  Magnetic: ({ children, className, ...props }) => (
    <a className={className} {...props}>
      {children}
    </a>
  ),
}));

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState(null, "", window.location.pathname);
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
  }));
});

test("renders the real identity, hero actions and mobile/reduced-motion visual", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: "Aryan Rawat" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      name: /Software Engineer Building Intelligent Systems/,
    }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Explore my work/ })).toHaveAttribute(
    "href",
    "#projects",
  );
  const resumeLinks = screen.getAllByRole("link", {
    name: "Download Resume",
  });
  expect(resumeLinks).toHaveLength(2);
  resumeLinks.forEach((link) => {
    expect(link).toHaveAttribute(
      "href",
      `${process.env.PUBLIC_URL || ""}/resume.pdf`,
    );
    expect(link).toHaveAttribute("download", "Aryan-Rawat-Resume.pdf");
  });
  expect(
    screen.queryByRole("button", { name: "Download Resume" }),
  ).not.toBeInTheDocument();
  expect(screen.queryByText(/PDF not yet available/)).not.toBeInTheDocument();
  expect(document.querySelector(".orbit-fallback")).toBeInTheDocument();
  expect(document.documentElement.dataset.motion).toBe("reduced");
});

test("features the requested projects with real previews, links and engineering details", () => {
  render(<App />);
  const titles = [...document.querySelectorAll(".project-case h3")].map(
    (element) => element.textContent,
  );
  expect(titles).toEqual([
    "Next Chapter",
    "IBM Docling",
    "OfferOS",
    "OpsPilot",
  ]);
  projects.slice(0, 4).forEach((project) => {
    const article = screen
      .getByRole("heading", { name: project.title })
      .closest("article");
    expect(within(article).getByRole("img")).toHaveAttribute(
      "src",
      project.image,
    );
    const github = within(article).getByRole("link", { name: "GitHub ↗" });
    expect(github).toHaveAttribute("href", project.links.github);
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    if (project.repositoryVisibility === "private") {
      expect(github).toHaveAccessibleDescription("Private repository · access required");
    }
    if (project.links.live) {
      expect(within(article).getByRole("link", { name: "Live ↗" })).toHaveAttribute("href", project.links.live);
    }
    expect(article.querySelector("details ul")).toBeInTheDocument();
  });
  const nextChapter = screen
    .getByRole("heading", { name: "Next Chapter" })
    .closest("article");
  expect(
    within(nextChapter).queryByRole("link", { name: "Live ↗" }),
  ).not.toBeInTheDocument();
});

test("opens the archive and retains all previous project links", () => {
  render(<App />);
  expect(
    screen.queryByRole("heading", { name: "RecruitIQ" }),
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /Keep exploring/ }));
  projects.slice(4).forEach((project) => {
    const article = screen
      .getByRole("heading", { name: project.title })
      .closest("article");
    expect(
      within(article).getByRole("link", { name: "GitHub ↗" }),
    ).toHaveAttribute("href", project.links.github);
    expect(
      within(article).getByRole("link", { name: "Live ↗" }),
    ).toHaveAttribute("href", project.links.live);
  });
  fireEvent.click(screen.getByRole("button", { name: /Close archive/ }));
  expect(
    screen.queryByRole("heading", { name: "RecruitIQ" }),
  ).not.toBeInTheDocument();
});

test("technology selection traces exact relationships from the real project data", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "PostgreSQL" }));
  expect(screen.getByRole("button", { name: "PostgreSQL" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(screen.getByRole("button", { name: "Python" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  const inspector = document.querySelector(".ecosystem-inspector");
  const related = projects.filter((project) =>
    project.stack.includes("PostgreSQL"),
  );
  expect(within(inspector).getAllByRole("link")).toHaveLength(related.length);
  related.forEach((project) =>
    expect(within(inspector).getByText(project.title)).toBeInTheDocument(),
  );
  expect(within(inspector).queryByText("IBM Docling")).not.toBeInTheDocument();
});

test("mobile navigation opens, navigates and closes with Escape", () => {
  render(<App />);
  const toggle = screen.getByRole("button", { name: "Menu +" });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  fireEvent.keyDown(window, { key: "Escape" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(toggle).toHaveFocus();
  fireEvent.click(toggle);
  fireEvent.click(screen.getByRole("link", { name: "01 Work" }));
  expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("copies contact email and reports clipboard failure accessibly", async () => {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: jest.fn().mockResolvedValue(undefined) },
  });
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Copy email" }));
  await waitFor(() =>
    expect(
      within(screen.getByRole("region", { name: "Contact" })).getByRole(
        "status",
      ),
    ).toHaveTextContent("Email copied to clipboard."),
  );
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
    "arawat3@stevens.edu",
  );
  navigator.clipboard.writeText.mockRejectedValueOnce(new Error("Blocked"));
  fireEvent.click(screen.getByRole("button", { name: "Copy email" }));
  await waitFor(() =>
    expect(
      within(screen.getByRole("region", { name: "Contact" })).getByRole(
        "status",
      ),
    ).toHaveTextContent("Copy email: arawat3@stevens.edu"),
  );
});

test("discipline previews and committed selections work without WebGL", () => {
  render(<App />);
  const controls = screen.getByRole("group", {
    name: "Explore engineering disciplines",
  });
  const backend = within(controls).getByRole("button", { name: /Backend/ });
  const ai = within(controls).getByRole("button", { name: /AI Systems/ });
  fireEvent.pointerEnter(backend);
  expect(
    screen.getByText("Structure behind the experience."),
  ).toBeInTheDocument();
  expect(ai).toHaveAttribute("aria-pressed", "true");
  expect(backend).toHaveAttribute("aria-pressed", "false");
  fireEvent.pointerLeave(backend);
  expect(
    screen.getByText("Intelligence, grounded in engineering."),
  ).toBeInTheDocument();

  disciplines.forEach((discipline) => {
    const button = within(controls).getByRole("button", {
      name: new RegExp(discipline.label),
    });
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(discipline.title)).toBeInTheDocument();
    expect(
      within(document.getElementById("orbit-detail")).getByRole("link", {
        name: discipline.evidence,
      }),
    ).toHaveAttribute("href", discipline.href);
    expect(
      within(document.querySelector(".hero-observatory")).getByRole("status"),
    ).toHaveTextContent(`${discipline.label} selected.`);
  });
  expect(document.querySelector("canvas")).not.toBeInTheDocument();
});

test("configured resume downloads use the Pages base path exactly once", () => {
  expect(resumeHref("resume.pdf", "/Portfolio")).toBe("/Portfolio/resume.pdf");
  expect(resumeHref("/resume.pdf", "/Portfolio/")).toBe(
    "/Portfolio/resume.pdf",
  );
  expect(resumeHref("/Portfolio/resume.pdf", "/Portfolio")).toBe(
    "/Portfolio/resume.pdf",
  );
  expect(resumeHref(null, "/Portfolio")).toBeNull();
  render(<ResumeAction path="resume.pdf" />);
  const download = screen.getByRole("link", { name: "Download Resume" });
  expect(download).toHaveAttribute(
    "href",
    `${process.env.PUBLIC_URL || ""}/resume.pdf`,
  );
  expect(download).toHaveAttribute("download", "Aryan-Rawat-Resume.pdf");
});

test("hero observers and visibility subscriptions are cleaned up", () => {
  const remove = jest.spyOn(document, "removeEventListener");
  const { unmount } = render(<App />);
  const observers = window.IntersectionObserver.mock.results.map(
    (result) => result.value,
  );
  unmount();
  observers.forEach((observer) =>
    expect(observer.disconnect).toHaveBeenCalled(),
  );
  expect(remove).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
  remove.mockRestore();
});

test("theme and animation controls retain useful functionality", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
  expect(document.documentElement.dataset.theme).toBe("light");
  expect(localStorage.getItem("theme")).toBe("light");
  fireEvent.click(screen.getByRole("button", { name: "Pause animations" }));
  expect(
    screen.getByRole("button", { name: "Enable animations" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(
    screen.getByRole("heading", { name: "Research Assistant" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /View Research Repo/ }),
  ).toHaveAttribute(
    "href",
    "https://github.com/jumbomuffin101/AI-Research-ConceptMapAnalysis",
  );
});

test("experience reflects the resume's current roles, dates, and impact metrics", () => {
  render(<App />);
  const course = screen
    .getByRole("heading", { name: "Course Assistant" })
    .closest("article");
  expect(course).toHaveTextContent("Sep 2026 - Present");
  expect(course).toHaveTextContent("30+ students");
  expect(
    screen.queryByText("Incoming Course Assistant"),
  ).not.toBeInTheDocument();
  const research = screen
    .getByRole("heading", { name: "Research Assistant" })
    .closest("article");
  expect(research).toHaveTextContent("May 2026 - Aug 2026");
  expect(research).toHaveTextContent("Streamlit");
  expect(research).toHaveTextContent("hallucination patterns");
  expect(within(research).queryByText("Next.js")).not.toBeInTheDocument();
  const genie = screen.getByText("GENIE AI").closest("article");
  [
    "Remote",
    "10+ microservices",
    "3 cross-functional teams",
    "15% of nightly batch failures",
    "15 to 2 minutes",
    "4x",
  ].forEach((fact) => expect(genie).toHaveTextContent(fact));
  const truclaim = screen.getByText("TruClaim").closest("article");
  [
    "May 2025 - Aug 2025",
    "200+ insurance claims weekly",
    "15 hours/week",
    "22%",
    "85%",
  ].forEach((fact) => expect(truclaim).toHaveTextContent(fact));
});

test("featured project dates and engineering details match the supplied resume", () => {
  render(<App />);
  const expected = [
    ["Next Chapter", "Oct 2026", "4-person team", "Supabase PostgreSQL"],
    [
      "IBM Docling",
      "Jun 2026 - Aug 2026",
      "merged upstream contribution",
      "file handle leaks",
    ],
    [
      "OfferOS",
      "Jun 2026 - Aug 2026",
      "authenticated users",
      "ownership-based access",
    ],
    [
      "OpsPilot",
      "Jun 2026 - Jul 2026",
      "Block Kit workflows",
      "deployment history",
    ],
  ];
  expected.forEach(([title, period, summary, detail]) => {
    const article = screen
      .getByRole("heading", { name: title })
      .closest("article");
    expect(within(article).getByText(period)).toBeVisible();
    expect(article).toHaveTextContent(summary);
    fireEvent.click(article.querySelector("summary"));
    expect(within(article).getByText(new RegExp(detail))).toBeVisible();
  });
});

test("education, skills, certifications, and contact details use the resume", () => {
  render(<App />);
  const education = screen.getByRole("region", { name: "Education" });
  expect(education).toHaveTextContent("3.7/4.0");
  expect(education).toHaveTextContent("Aug 2024 - Dec 2027");
  expect(education).toHaveTextContent("Upsilon Pi Epsilon (UPE)");
  fireEvent.click(within(education).getByText(/Relevant Coursework/));
  [
    "Database Management Systems",
    "Theory of Computation",
    "Web Programming",
  ].forEach((course) =>
    expect(within(education).getByText(course)).toBeVisible(),
  );
  fireEvent.click(within(education).getByText(/Certifications/));
  expect(
    within(education).getByText("AWS Cloud Practitioner").closest("p"),
  ).toHaveTextContent("2025");
  expect(
    within(education).getByText("AWS AI Practitioner").closest("p"),
  ).toHaveTextContent("2026");
  fireEvent.click(screen.getByText(/Explore the full toolset/));
  const tools = document.querySelector(".skills-grid");
  ["C++", "Streamlit", "OpenAI", "GitHub Actions", "Prisma"].forEach((tool) =>
    expect(within(tools).getByText(tool)).toBeVisible(),
  );
  expect(
    screen.getByRole("link", { name: "arawat3@stevens.edu" }),
  ).toHaveAttribute("href", "mailto:arawat3@stevens.edu");
  expect(
    screen.getByRole("link", { name: "+1 (917) 306-4440" }),
  ).toHaveAttribute("href", "tel:+19173064440");
});

test("the LLM explorer includes OpenAI-backed projects after the stack update", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "LLMs" }));
  const inspector = document.querySelector(".ecosystem-inspector");
  expect(within(inspector).getByText("OpsPilot")).toBeInTheDocument();
  expect(
    within(inspector).getByText("AI Clinical Ops Agent"),
  ).toBeInTheDocument();
  expect(within(inspector).queryByText("IBM Docling")).not.toBeInTheDocument();
});

test("the configured public resume asset contains an actual PDF", () => {
  const pdf = readFileSync(path.join(__dirname, "../public/resume.pdf"));
  expect(pdf.subarray(0, 5).toString()).toBe("%PDF-");
  expect(pdf.length).toBeGreaterThan(1000);
});

test("shared section URLs restore their destination after the React content mounts", async () => {
  const original = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = jest.fn();
  window.history.replaceState(null, "", "#education");
  const { unmount } = render(<App />);
  await waitFor(() => expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "start" }));
  expect(document.getElementById("education")).toHaveFocus();
  unmount();
  window.history.replaceState(null, "", window.location.pathname);
  Element.prototype.scrollIntoView = original;
});

test("project engineering maps expose selectable implementation stages", () => {
  render(<App />);
  const article = document.getElementById("ibm-docling");
  const cleanup = within(article).getByRole("button", { name: /Targeted cleanup/ });
  fireEvent.click(cleanup);
  expect(cleanup).toHaveAttribute("aria-pressed", "true");
  expect(within(article).getByRole("button", { name: /Initialization fails/ })).toHaveAttribute("aria-pressed", "false");
  expect(document.getElementById("ibm-docling-flow-detail")).toHaveTextContent("File handle release");
  const navigation = screen.getByRole("navigation", { name: "Project chapters" });
  expect(within(navigation).getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual([
    "#next-chapter", "#ibm-docling", "#offeros", "#opspilot",
  ]);
});

test("chapter navigation follows the visible project and disconnects its observer", () => {
  const observations = [];
  window.IntersectionObserver.mockImplementation((callback) => {
    const observer = { observe: jest.fn(), disconnect: jest.fn(), callback };
    observations.push(observer);
    return observer;
  });
  const { unmount } = render(<App />);
  const observer = observations.find((entry) => entry.observe.mock.calls.some(([target]) => target.id === "ibm-docling"));
  act(() => observer.callback([{ target: document.getElementById("ibm-docling"), isIntersecting: true }]));
  const navigation = screen.getByRole("navigation", { name: "Project chapters" });
  expect(within(navigation).getByRole("link", { name: "02 IBM Docling" })).toHaveAttribute("aria-current", "step");
  expect(within(navigation).getByRole("link", { name: "01 Next Chapter" })).not.toHaveAttribute("aria-current");
  unmount();
  expect(observer.disconnect).toHaveBeenCalledTimes(1);
});

test("each real project screenshot can open and close with focus restored", () => {
  HTMLDialogElement.prototype.showModal = jest.fn(function () { this.setAttribute("open", ""); });
  render(<App />);
  projects.slice(0, 4).forEach((project) => {
    const trigger = screen.getByRole("button", { name: `Enlarge ${project.title} screenshot` });
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: project.title });
    expect(dialog).toHaveAttribute("data-lenis-prevent");
    expect(within(dialog).getByRole("img")).toHaveAttribute("src", project.image);
    fireEvent.click(within(dialog).getByRole("button", { name: "Close project preview" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });
});

test("Docling preview is a real PNG with matching native dimensions and a base-prefixed URL", () => {
  const png = readFileSync(path.join(__dirname, "../public/projects/ibm-docling.png"));
  expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  render(<App />);
  const image = within(document.getElementById("ibm-docling")).getByRole("img");
  expect(image.getAttribute("src")).toBe(`${process.env.PUBLIC_URL || ""}/projects/ibm-docling.png`);
  expect(Number(image.getAttribute("width"))).toBe(png.readUInt32BE(16));
  expect(Number(image.getAttribute("height"))).toBe(png.readUInt32BE(20));
});
