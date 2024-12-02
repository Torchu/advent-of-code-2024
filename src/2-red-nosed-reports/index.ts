const readInput = async (file: string): Promise<number[][]> => {
  const data = Bun.file(file);
  const text = await data.text();
  return text.split("\n").map((line) => {
    return line.split(" ").map((x) => parseInt(x));
  });
};

/**
 * Checks if a report is safe or not. A report is safe if:
 * - The order of the numbers is consistent
 * - The difference between each number is between 1 and 3
 *
 * @param report An array of numbers representing the report to check
 * @param dampener If true, a report is considered safe if it can be made safe by removing one number
 *
 * @returns True if the report is safe, false otherwise
 */
const isReportSafe = (report: number[], dampener = false): boolean => {
  const order = report[0] < report[1];
  for (let i = 1; i < report.length; i++) {
    const difference = Math.abs(report[i - 1] - report[i]);
    if (
      order !== report[i - 1] < report[i] ||
      difference < 1 ||
      difference > 3
    ) {
      if (!dampener) {
        return false;
      }

      // Get all the variants of the report with one number removed
      const variants = report.map((_, j) =>
        report.slice(0, j).concat(report.slice(j + 1))
      );
      return variants.some((variant) => isReportSafe(variant));
    }
  }
  return true;
};

/**
 * Counts the number of safe reports in a list of reports
 *
 * @param reports List of reports to check
 * @param dampener Whether the dampener is active or not
 *
 * @returns The number of safe reports
 */
const countSafeReports = (reports: number[][], dampener = false): number => {
  return reports.filter((report) => isReportSafe(report, dampener)).length;
};

// MAIN
const main = async (file: string) => {
  const data = await readInput(file);
  console.log(countSafeReports(data));
  console.log(countSafeReports(data, true));
};

export default main;
