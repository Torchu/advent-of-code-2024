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

// MAIN
const main = async (file: string) => {
  const data = await readInput(file);
  console.log(data);
};

export default main;
