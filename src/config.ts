import day1 from "./1-historian-hysteria/index";
import day2 from "./2-red-nosed-reports/index";
import day3 from "./3-mull-it-over/index";
import day4 from "./4-ceres-search/index";
import day5 from "./5-print-queue/index";
import day6 from "./6-guard-gallivant/index";

type Day = {
  fn: (file: string) => void;
  path: string;
};

const days: Record<string, Day> = {
  1: {
    fn: day1,
    path: "src/1-historian-hysteria",
  },
  2: {
    fn: day2,
    path: "src/2-red-nosed-reports",
  },
  3: {
    fn: day3,
    path: "src/3-mull-it-over",
  },
  4: {
    fn: day4,
    path: "src/4-ceres-search",
  },
  5: {
    fn: day5,
    path: "src/5-print-queue",
  },
  6: {
    fn: day6,
    path: "src/6-guard-gallivant",
  },
};

export default days;
