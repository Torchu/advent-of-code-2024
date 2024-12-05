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
 * Validate the updates using a ruleset
 *
 * @param rules - Rules to check the updates against
 * @param updates Updates to check
 *
 * @returns A dictionary with the valid and invalid updates
 */
const validateUpdates = (
  rules: Record<number, number[]>,
  updates: number[][]
): { validUpdates: number[][]; invalidUpdates: number[][] } => {
  const validUpdates: number[][] = [];
  const invalidUpdates: number[][] = [];
  updates.forEach((update) => {
    if (isValidUpdate(rules, update)) {
      validUpdates.push(update);
    } else {
      invalidUpdates.push(update);
    }
  });
  return { validUpdates, invalidUpdates };
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

/**
 * Sum the middle number of all valid updates.
 *
 * @param updates - The updates to sum.
 *
 * @returns The sum of the middle number of the updates.
 */
const sumUpdates = (updates: number[][]): number => {
  return updates.reduce(
    (acc, update) => acc + update[Math.floor(update.length / 2)],
    0
  );
};

/**
 * Fixes the update by reordering the numbers according to the rules.
 *
 * @param rules - Rules to fix the update.
 * @param update - Update to fix.
 *
 * @returns The fixed update.
 */
const fixUpdate = (
  rules: Record<number, number[]>,
  update: number[]
): number[] => {
  let result = [...update];
  do {
    for (let i = 0; i < result.length; i++) {
      if (!rules[result[i]]) continue;
      for (let j = 0; j < i; j++) {
        if (rules[result[i]].includes(result[j])) {
          const tmp = result[j];
          result[j] = result[i];
          result[i] = tmp;
        }
      }
    }
  } while (!isValidUpdate(rules, result));
  return result;
};

// MAIN
const main = async (file: string) => {
  const data = await readInput(file);
  const { validUpdates, invalidUpdates } = validateUpdates(
    data.rules,
    data.updates
  );
  console.log(sumUpdates(validUpdates));

  console.log(
    sumUpdates(invalidUpdates.map((update) => fixUpdate(data.rules, update)))
  );
};

export default main;
