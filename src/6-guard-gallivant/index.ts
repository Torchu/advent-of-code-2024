const readInput = async (file: string): Promise<string> => {
  const data = Bun.file(file);
  const text = await data.text();
  return text;
};

// MAIN
const main = async (file: string) => {
  const data = await readInput(file);
  console.log(data);
};

export default main;
