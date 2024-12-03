const readInput = async (file: string): Promise<string> => {
  const data = Bun.file(file);
  return await data.text();
};

const clearData = (data: string): number[][] => {
  const matches = [...data.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)];
  return matches.map((match) => [parseInt(match[1]), parseInt(match[2])]);
};

const processData = (data: number[][]): number => {
  let result = 0;
  data.forEach((pair) => {
    result += pair[0] * pair[1];
  });
  return result;
};

// MAIN
const main = async (file: string) => {
  const corruptedData = await readInput(file);
  const data = clearData(corruptedData);
  console.log(processData(data));
};

export default main;
