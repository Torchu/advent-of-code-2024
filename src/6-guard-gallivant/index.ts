enum Direction {
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3,
}

type Position = {
  x: number;
  y: number;
  direction: Direction;
};

const readInput = async (
  file: string
): Promise<{ initialPosition: Position; map: string[][] }> => {
  const data = Bun.file(file);
  const text = await data.text();
  let initialPosition: Position | undefined = undefined;
  const map: string[][] = [];
  text.split("\n").forEach((line) => {
    const mapLine = line.split("").map((char, idx) => {
      switch (char) {
        case "^":
          initialPosition = {
            x: idx,
            y: map.length,
            direction: Direction.UP,
          };
          return "";
        case ">":
          initialPosition = {
            x: idx,
            y: map.length,
            direction: Direction.RIGHT,
          };
          return "";
        case "v":
          initialPosition = {
            x: idx,
            y: map.length,
            direction: Direction.DOWN,
          };
          return "";
        case "<":
          initialPosition = {
            x: idx,
            y: map.length,
            direction: Direction.LEFT,
          };
          return "";
        case ".":
          return "";
        default:
          return char;
      }
    });
    map.push(mapLine);
  });
  if (!initialPosition) {
    throw new Error("Invalid input: no initial position found");
  }
  return { initialPosition, map };
};

/**
 * Check if the given position is an obstacle
 *
 * @param map Map of the area
 * @param x X coordinate
 * @param y Y coordinate
 *
 * @returns True if the position is an obstacle, false otherwise
 */
const isObstacle = (map: string[][], x: number, y: number): boolean => {
  return map[y][x] === "#";
};

/**
 * Check if the given position is out of bounds
 *
 * @param map Map of the area
 * @param x X coordinate
 * @param y Y coordinate
 *
 * @returns True if the position is out of bounds, false otherwise
 */
const isOutOfBounds = (map: string[][], x: number, y: number): boolean => {
  return map.length <= y || map[0].length <= x || x < 0 || y < 0;
};

// MAIN
const main = async (file: string) => {
  const data = await readInput(file);
  console.log(data);
  console.log(isObstacle(data.map, 0, 0));
  console.log(isObstacle(data.map, 4, 0));
  console.log(isOutOfBounds(data.map, 0, 0));
  console.log(isOutOfBounds(data.map, -1, 0));
  console.log(isOutOfBounds(data.map, 0, 10));
};

export default main;
