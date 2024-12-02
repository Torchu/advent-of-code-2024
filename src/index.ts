import day1 from "./1-historian-hysteria/index";
import day2 from "./2-red-nosed-reports/index";

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
};

const dayNumber = process.argv[2];
if (!dayNumber) {
  console.log("Please provide a day number as an argument");
  process.exit(1);
}

const day = days[dayNumber];
if (!day) {
  console.log("Day not ready yet");
  process.exit(1);
}

const file = process.argv[3] ?? "input.txt";

day.fn(`${day.path}/${file}`);
