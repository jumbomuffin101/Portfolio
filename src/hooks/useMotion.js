import { createContext, useContext, useEffect, useState } from "react";

export const MotionContext = createContext({ reduced: false, paused: false });
export const useMotion = () => useContext(MotionContext);

export function usePageVisibility() {
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
}

export function useMedia(query, initial = false) {
  const [matches, setMatches] = useState(
    () => window.matchMedia?.(query).matches ?? initial,
  );
  useEffect(() => {
    const media = window.matchMedia?.(query);
    if (!media) return undefined;
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}
