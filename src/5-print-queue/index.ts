type Data = {
  rules: Record<number, number[]>;
  updates: number[][];
};

const readInput = async (file: string): Promise<Data> => {
  const data = Bun.file(file);
  const text = await data.text();
  const rules: Record<number, number[]> = {};
  const updates: number[][] = [];
  let isFirstSection = true;
  text.split("\n").forEach((line) => {
    // Change section on empty line
    if (line === "") {
      isFirstSection = false;
      return;
    }

    if (isFirstSection) {
      const [a, b] = line.split("|").map((n) => parseInt(n));
      rules[a] = rules[a] ? [...rules[a], b] : [b];
    } else {
      const update = line.split(",").map((n) => parseInt(n));
      updates.push(update);
    }
  });
  return { rules, updates };
};

/**
 * Checks if the update is valid.
 *
 * @param rules - The rules to check the update against.
 * The key is the number to check and the values the numbers that cannot appear before the key.
 * @param update - The update to check.
 *
 * @returns True if the update is valid, false otherwise.
 */
const isValidUpdate = (
  rules: Record<number, number[]>,
  update: number[]
): boolean => {
  return update.every((n: number, idx: number) => {
    if (!rules[n]) return true;
    const previous = update.slice(0, idx);
    return rules[n].every((rule) => !previous.includes(rule));
  });
};

// MAIN
const main = async (file: string) => {
  const data = await readInput(file);
  data.updates.forEach((update) => {
    console.log(update, isValidUpdate(data.rules, update));
  });
};

export default main;
