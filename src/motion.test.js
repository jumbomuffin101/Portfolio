import { act, render, renderHook } from "@testing-library/react";
import gsap from "gsap";
import Lenis from "lenis";
import InteractionSystem from "./components/InteractionSystem";
import { MotionContext, usePageVisibility } from "./hooks/useMotion";

jest.mock("gsap", () => ({
  __esModule: true,
  default: {
    registerPlugin: jest.fn(),
    context: jest.fn(),
    ticker: { add: jest.fn(), remove: jest.fn() },
  },
}));
jest.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: { update: jest.fn(), refresh: jest.fn() } }));
jest.mock("lenis", () => ({ __esModule: true, default: jest.fn() }));

let frames, lenis, observer, revert;
beforeEach(() => {
  jest.clearAllMocks();
  frames = new Set();
  gsap.ticker.add.mockImplementation((tick) => frames.add(tick));
  gsap.ticker.remove.mockImplementation((tick) => frames.delete(tick));
  revert = jest.fn();
  // Browser QA exercises actual choreography; this isolates driver ownership.
  gsap.context.mockReturnValue({ revert });
  lenis = Object.fromEntries(["on", "off", "raf", "resize", "start", "stop", "destroy", "scrollTo"].map((key) => [key, jest.fn()]));
  Lenis.mockImplementation(() => lenis);
  window.matchMedia = jest.fn(() => ({ matches: false }));
  window.ResizeObserver = jest.fn(() => (observer = { observe: jest.fn(), disconnect: jest.fn() }));
});

function Driver({ visible = true, paused = false }) {
  return <MotionContext.Provider value={{ reduced: false, paused, pageVisible: visible }}><main><a href="#destination">Next section</a><section id="destination" tabIndex="-1" /><InteractionSystem /></main></MotionContext.Provider>;
}

test("hidden tabs stop smooth scrolling without duplicating its driver on return", () => {
  const { rerender, unmount } = render(<Driver />);
  frames.forEach((tick) => tick(1));
  expect(lenis.raf).toHaveBeenCalledWith(1000);
  expect(frames.size).toBe(1);
  rerender(<Driver visible={false} />);
  expect(frames.size).toBe(0);
  expect(lenis.stop).toHaveBeenCalledTimes(1);
  rerender(<Driver />);
  expect(frames.size).toBe(1);
  expect(Lenis).toHaveBeenCalledTimes(1);
  unmount();
  expect(frames.size).toBe(0);
  expect(observer.disconnect).toHaveBeenCalledTimes(1);
  expect(revert).toHaveBeenCalledTimes(1);
  expect(lenis.destroy).toHaveBeenCalledTimes(1);
  expect(lenis.off).toHaveBeenCalledWith("scroll", lenis.on.mock.calls[0][1]);
});

test("pausing motion disposes the driver and resumes with one clean instance", () => {
  const { rerender, unmount } = render(<Driver />);
  rerender(<Driver paused />);
  expect(frames.size).toBe(0);
  expect(lenis.destroy).toHaveBeenCalledTimes(1);
  rerender(<Driver />);
  expect(Lenis).toHaveBeenCalledTimes(2);
  expect(frames.size).toBe(1);
  unmount();
  expect(frames.size).toBe(0);
});

test("document visibility is observed and unsubscribed", () => {
  const original = Object.getOwnPropertyDescriptor(document, "hidden");
  Object.defineProperty(document, "hidden", { configurable: true, value: false });
  const remove = jest.spyOn(document, "removeEventListener");
  const { result, unmount } = renderHook(usePageVisibility);
  expect(result.current).toBe(true);
  act(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  expect(result.current).toBe(false);
  unmount();
  expect(remove).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
  remove.mockRestore();
  if (original) Object.defineProperty(document, "hidden", original);
  else delete document.hidden;
});

test("same-page links use one scroll driver, preserve history and focus the destination", () => {
  const { getByRole, unmount } = render(<Driver />);
  const click = new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 });
  act(() => getByRole("link", { name: "Next section" }).dispatchEvent(click));
  expect(click.defaultPrevented).toBe(true);
  expect(lenis.scrollTo).toHaveBeenCalledTimes(1);
  expect(window.location.hash).toBe("#destination");
  const [target, options] = lenis.scrollTo.mock.calls[0];
  options.onComplete();
  expect(target).toHaveFocus();
  unmount();
  window.history.replaceState(null, "", window.location.pathname);
});

test("native modal focus stops an in-flight scroll until focus returns to the page", () => {
  const { unmount, getByRole } = render(<Driver />);
  const dialog = document.createElement("dialog");
  dialog.setAttribute("open", "");
  const close = document.createElement("button");
  dialog.appendChild(close);
  document.body.appendChild(dialog);
  act(() => close.focus());
  expect(frames.size).toBe(0);
  expect(lenis.stop).toHaveBeenCalledTimes(1);
  dialog.remove();
  act(() => getByRole("link", { name: "Next section" }).focus());
  expect(frames.size).toBe(1);
  unmount();
  expect(frames.size).toBe(0);
});
