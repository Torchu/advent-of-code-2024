import day1 from "./1-historian-hysteria/index";
import day2 from "./2-red-nosed-reports/index";

const dayFns: Record<string, (file: string) => Promise<void>> = {
  "1": day1,
  "2": day2,
};

const day = process.argv[2];
if (!day) {
  console.log("Please provide a day number as an argument");
  process.exit(1);
}

const dayFn = dayFns[day];
if (!dayFn) {
  console.log("Day not ready yet");
  process.exit(1);
}

const file = process.argv[3] ?? "input.txt";

dayFn(file);
