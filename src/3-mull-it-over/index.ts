const readInput = async (file: string): Promise<string> => {
  const data = Bun.file(file);
  return await data.text();
};

const clearData = (data: string) => data.match(/mul\(\d{1,3},\d{1,3}\)/g);

const clearDataV2 = (data: string) =>
  data.match(/mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g);

const processData = (data: RegExpMatchArray): number => {
  let isEnabled = true;
  const pairs = data.map((match) => {
    if (match === "don't()") {
      isEnabled = false;
      return null;
    }
    if (match === "do()") {
      isEnabled = true;
      return null;
    }
    if (!isEnabled) {
      return null;
    }
    const numbers = match.match(/\d{1,3}/g);
    return numbers ? [Number(numbers[0]), Number(numbers[1])] : null;
  });

  let result = 0;
  pairs.forEach((pair) => {
    if (pair) {
      result += pair[0] * pair[1];
    }
  });
  return result;
};

// MAIN
const main = async (file: string) => {
  const corruptedData = await readInput(file);

  const data = clearData(corruptedData);
  if (!data) {
    console.error("Data is corrupted");
    return;
  }
  console.log(processData(data));

  const dataV2 = clearDataV2(corruptedData);
  if (!dataV2) {
    console.error("Data is corrupted");
    return;
  }
  console.log(processData(dataV2));
};

export default main;
