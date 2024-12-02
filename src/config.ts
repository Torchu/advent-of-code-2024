import day1 from "./1-historian-hysteria/index";
import day2 from "./2-red-nosed-reports/index";
import day3 from "./3-mull-it-over/index";

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
};

export default days;
