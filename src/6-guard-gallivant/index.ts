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
 * Move the guard to the next position
 *
 * @param map Map of the area
 * @param position Current position of the guard
 *
 * @returns New position of the guard
 */
const move = (map: string[][], position: Position): Position => {
  const { x, y, direction } = position;
  let newPosition: Position | undefined = undefined;
  switch (direction) {
    case Direction.UP:
      newPosition = { x, y: y - 1, direction };
      break;
    case Direction.RIGHT:
      newPosition = { x: x + 1, y, direction };
      break;
    case Direction.DOWN:
      newPosition = { x, y: y + 1, direction };
      break;
    default: // Direction.LEFT
      newPosition = { x: x - 1, y, direction };
      break;
  }
  if (isObstacle(map, newPosition.x, newPosition.y)) {
    newPosition = { x, y, direction: (direction + 1) % 4 };
  }
  return newPosition;
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
  if (isOutOfBounds(map, x, y)) {
    return false;
  }
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

/**
 * Completes the patrol route of the guard and returns the positions visited
 * It will stop when the guard goes out of bounds
 *
 * @remarks If the guard is stuck in a loop, it will throw an error
 *
 * @param map Map of the area
 * @param initialPosition Initial position of the guard
 *
 * @returns The list of positions visited by the guard
 */
const patrol = (map: string[][], initialPosition: Position): Position[] => {
  let currentPosition = { ...initialPosition };
  const visitedPositions: Position[] = [];
  while (!isOutOfBounds(map, currentPosition.x, currentPosition.y)) {
    if (
      visitedPositions.some(
        (position) =>
          position.x === currentPosition.x &&
          position.y === currentPosition.y &&
          position.direction === currentPosition.direction
      )
    ) {
      throw new Error("Guard is stuck in a loop");
    }
    visitedPositions.push(currentPosition);
    currentPosition = move(map, currentPosition);
  }
  return visitedPositions;
};

/**
 * Count the number of unique positions in the given route
 *
 * @param route Route of the guard
 *
 * @returns The number of unique positions in the route
 */
const countPositions = (route: Position[]): number => {
  const positions = new Set<string>();
  route.forEach((position) => {
    positions.add(`${position.x},${position.y}`);
  });
  return positions.size;
};

/**
 * Given a map and the initial position of the guard, brute-forces the list of coordinates that if changed
 * to an obstacle, the guard will be in a loop
 *
 * @param map Map of the area
 * @param position Initial position of the guard
 */
const obstructGuard = (
  map: string[][],
  position: Position
): { x: number; y: number }[] => {
  const obstructions: { x: number; y: number }[] = [];
  for (let y = 0; y < map.length; y++) {
    console.log(`${y}/${map.length}`);
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] !== "") {
        continue;
      }
      const newMap = map.map((line) => line.slice());
      newMap[y][x] = "#";
      try {
        patrol(newMap, position);
      } catch (e) {
        obstructions.push({ x, y });
      }
    }
  }
  return obstructions;
};

// MAIN
const main = async (file: string) => {
  const data = await readInput(file);
  const route = patrol(data.map, data.initialPosition);
  console.log(countPositions(route));
  const obstructions = obstructGuard(data.map, data.initialPosition);
  console.log(obstructions.length);
};

export default main;
