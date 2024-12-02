import { promises as fs } from "node:fs";
import * as path from "node:path";
import config from "./config";

const findFileMatchingPattern = async (
  folderPath: string,
  pattern: RegExp
): Promise<string | null> => {
  try {
    const files = await fs.readdir(folderPath);

    const matchedFile = files.find((file) => pattern.test(file));

    return matchedFile ? path.join(folderPath, matchedFile) : null;
  } catch (error) {
    console.error("Error reading folder:", error);
    return null;
  }
};

// MAIN
(async () => {
  const dayNumber = process.argv[2];
  if (!dayNumber) {
    console.log("Please provide a day number as an argument");
    process.exit(1);
  }

  const day = config[dayNumber];
  if (!day) {
    console.log("Day not ready yet");
    process.exit(1);
  }

  if (!process.argv[3]) {
    console.log("No pattern provided, using default input.txt");
    day.fn(`${day.path}/input.txt`);
    return;
  }

  const file = await findFileMatchingPattern(
    day.path,
    new RegExp(process.argv[3])
  );
  if (!file) {
    console.log("No file found matching pattern");
    process.exit(1);
  }

  day.fn(file);
})();
