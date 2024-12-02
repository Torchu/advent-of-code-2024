const readInput = async (
  file: string
): Promise<{ listA: number[]; listB: number[] }> => {
  const listA: number[] = [];
  const listB: number[] = [];
  const data = Bun.file(file);
  const text = await data.text();
  text.split("\n").forEach((line) => {
    const [a, b] = line.split("   ").map((x) => parseInt(x));
    listA.push(a);
    listB.push(b);
  });
  return { listA, listB };
};

const distance = (listA: number[], listB: number[]): number => {
  listA.sort();
  listB.sort();
  let sum = 0;
  for (let i = 0; i < listA.length; i++) {
    sum += Math.abs(listA[i] - listB[i]);
  }
  return sum;
};

const similarity = (listA: number[], listB: number[]): number => {
  let res = 0;
  listA.forEach((x) => {
    const hits = listB.filter((y) => y === x).length;
    res += x * hits;
  });
  return res;
};

// MAIN
const main = async (file: string) => {
  const { listA, listB } = await readInput(file);
  console.log(`Distance: ${distance(listA, listB)}`);
  console.log(`Similarity: ${similarity(listA, listB)}`);
};

export default main;
