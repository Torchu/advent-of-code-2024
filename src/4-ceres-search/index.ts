const readInput = async (file: string): Promise<string[][]> => {
  const data = Bun.file(file);
  const text = await data.text();
  return text.split("\n").map((line) => line.split(""));
};

/**
 * Count the number of times the word XMAS appears in the data
 * It can appear horizontally, vertically, diagonally, and in reverse
 *
 * @param data The data to search for the word XMAS
 *
 * @returns The number of times the word XMAS appears in the data
 */
const countWords = (data: string[][]): number => {
  const word = "XMAS";
  let count = 0;

  // Horizontal
  for (let i = 0; i < data.length; i++) {
    const line = data[i].join("");
    count += (line.match(new RegExp(word, "g")) || []).length;
    count += (
      line.split("").reverse().join("").match(new RegExp(word, "g")) || []
    ).length;
  }

  // Vertical
  for (let i = 0; i < data[0].length; i++) {
    let line = "";
    for (let j = 0; j < data.length; j++) {
      line += data[j][i];
    }
    count += (line.match(new RegExp(word, "g")) || []).length;
    count += (
      line.split("").reverse().join("").match(new RegExp(word, "g")) || []
    ).length;
  }

  // Diagonal (top-left to bottom-right)
  for (let i = 0; i < data.length; i++) {
    let line = "";
    for (let j = 0; j < data.length; j++) {
      if (i + j < data.length) {
        line += data[j][i + j];
      }
    }
    count += (line.match(new RegExp(word, "g")) || []).length;
    count += (
      line.split("").reverse().join("").match(new RegExp(word, "g")) || []
    ).length;
  }

  // Skip the first line since it was already counted
  for (let i = 1; i < data.length; i++) {
    let line = "";
    for (let j = 0; j < data.length; j++) {
      if (i + j < data.length) {
        line += data[i + j][j];
      }
    }
    count += (line.match(new RegExp(word, "g")) || []).length;
    count += (
      line.split("").reverse().join("").match(new RegExp(word, "g")) || []
    ).length;
  }

  // Diagonal (bottom-left to top-right)
  for (let i = 0; i < data.length; i++) {
    let line = "";
    for (let j = 0; j < data.length; j++) {
      if (i + j < data.length) {
        line += data[data.length - 1 - i - j][j];
      }
    }
    count += (line.match(new RegExp(word, "g")) || []).length;
    count += (
      line.split("").reverse().join("").match(new RegExp(word, "g")) || []
    ).length;
  }

  // Skip the first line since it was already counted
  for (let i = 1; i < data.length; i++) {
    let line = "";
    for (let j = 0; j < data.length; j++) {
      if (i + j < data.length) {
        line += data[data.length - 1 - j][j + i];
      }
    }
    count += (line.match(new RegExp(word, "g")) || []).length;
    count += (
      line.split("").reverse().join("").match(new RegExp(word, "g")) || []
    ).length;
  }

  return count;
};

/**
 * Returns the number of crosses of the word MAS in the data.
 * A cross is defined as a 3x3 square where the char A is in the center and the chars M and S are in the corners.
 *
 * @param data The data to search for the word MAS
 *
 * @returns The number of crosses of the word MAS in the data
 */
const countCrosses = (data: string[][]): number => {
  let count = 0;
  for (let i = 1; i < data.length - 1; i++) {
    for (let j = 1; j < data.length - 1; j++) {
      if (data[i][j] !== "A") {
        continue;
      }

      if (
        (data[i - 1][j - 1] !== "M" || data[i + 1][j + 1] !== "S") &&
        (data[i - 1][j - 1] !== "S" || data[i + 1][j + 1] !== "M")
      ) {
        continue;
      }

      if (
        (data[i - 1][j + 1] !== "M" || data[i + 1][j - 1] !== "S") &&
        (data[i - 1][j + 1] !== "S" || data[i + 1][j - 1] !== "M")
      ) {
        continue;
      }

      count++;
    }
  }
  return count;
};

// MAIN
const main = async (file: string) => {
  const data = await readInput(file);
  console.log(countWords(data));
  console.log(countCrosses(data));
};

export default main;
