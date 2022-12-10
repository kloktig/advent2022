import { read } from "../readFile";

export const data: any = parse(read(9, "test2.txt"));
type Pos = { x: number; y: number };
type Move = { op: string; steps: number };

let [visited, moves] = getVisited(data);
console.log(`silver: ${visited.size}`);
printKnot(visited);

for (const iter of [2, 3, 4, 5, 6, 7, 8, 9].slice(0, 2)) {
  [visited, moves] = getVisited(moves);
  console.log(iter);
  printKnot(visited);
}

function getVisited(moves: Move[]): [Set<string>, Move[]] {
  let H = { x: 0, y: 0 };
  let T = { x: 0, y: 0 };
  let visited = new Set<string>();
  visited.add(JSON.stringify(T));
  const tailMoves: Move[] = [];
  let previousOp = undefined;
  for (const move of moves) {
    for (let i = 0; i < move.steps; i++) {
      const temp = H;
      switch (move.op) {
        case "R":
          H = { x: H.x + 1, y: H.y };
          break;
        case "L":
          H = { x: H.x - 1, y: H.y };
          break;
        case "U":
          H = { x: H.x, y: H.y + 1 };
          break;
        case "D":
          H = { x: H.x, y: H.y - 1 };
          break;

        default:
          break;
      }
      console.log(`${previousOp} => ${move.op}`);
      if (diff(T, H) > Math.sqrt(2)) {
        const nmoves = getMoves(T, temp, move.op, previousOp);
        //nmoves.reverse();
        tailMoves.push(...nmoves);
        T = temp;
      }
      if (move.op !== previousOp) previousOp = move.op;
      visited.add(JSON.stringify(T));
    }
  }
  return [visited, tailMoves];
}

function diff(a: Pos, b: Pos) {
  return Math.floor(
    Math.sqrt(
      Math.pow(Math.abs(b.x - a.x), 2) + Math.pow(Math.abs(b.y - a.y), 2)
    )
  );
}

export function printKnot(visited: Set<string>) {
  let maxX = 0;
  let maxY = 0;
  let minX = 0;
  let minY = 0;
  const visitedArr: Pos[] = Array.from(visited).map(
    (v) => JSON.parse(v) as Pos
  );

  for (const p of visitedArr) {
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
  }

  let str = "";
  for (let y = maxY; y >= minY; y--) {
    for (let x = minY; x <= maxX; x++) {
      str += visitedArr.filter((p) => p.x === x && p.y === y).length
        ? x === 0 && y === 0
          ? "S"
          : "#"
        : ".";
    }
    str += "\n";
  }
  console.log(str);
}
function getMoves(
  T: Pos,
  next: Pos,
  op: string,
  previousOp: string | undefined
): Move[] {
  const x = next.x - T.x;
  const y = next.y - T.y;
  console.log(`xdiff:${x},ydiff:${y} - ${previousOp} => ${op}`);
  if (
    previousOp === undefined ||
    op == previousOp ||
    (op == "D" && previousOp == "U") ||
    (op == "U" && previousOp == "D") ||
    (op == "R" && previousOp == "L") ||
    (op == "L" && previousOp == "R")
  ) {
    if (Math.abs(x) + Math.abs(y) < 1) throw new Error();
    if (x > 0) {
      return [{ op: "R", steps: 1 }];
    } else if (x < 0) {
      return [{ op: "L", steps: 1 }];
    } else if (y > 0) {
      return [{ op: "U", steps: 1 }];
    } else if (y < 0) {
      return [{ op: "D", steps: 1 }];
    }
  } else {
    if (op == "D" && previousOp == "L") {
      return [
        { op: "L", steps: 1 },
        { op: "D", steps: 1 },
      ];
    } else if (op == "U" && previousOp == "L") {
      return [
        { op: "L", steps: 1 },
        { op: "U", steps: 1 },
      ];
    } else if (op == "D" && previousOp == "R") {
      return [
        { op: "R", steps: 1 },
        { op: "D", steps: 1 },
      ];
    } else if (op == "U" && previousOp == "R") {
      return [
        { op: "R", steps: 1 },
        { op: "U", steps: 1 },
      ];
    } else if (op == "L" && previousOp == "U") {
      return [
        { op: "U", steps: 1 },
        { op: "L", steps: 1 },
      ];
    } else if (op == "R" && previousOp == "U") {
      return [
        { op: "U", steps: 1 },
        { op: "R", steps: 1 },
      ];
    } else if (op == "L" && previousOp == "D") {
      return [
        { op: "D", steps: 1 },
        { op: "L", steps: 1 },
      ];
    } else if (op == "R" && previousOp == "D") {
      return [
        { op: "D", steps: 1 },
        { op: "R", steps: 1 },
      ];
    }
  }

  throw new Error(
    `T:${JSON.stringify(T)},next:${JSON.stringify(
      next
    )},op:${op},prev:${previousOp}`
  );
}

function parse(lines: string[]) {
  const d = [];
  for (const line of lines) {
    const [op, steps] = line.split(" ");
    d.push({ op, steps: Number.parseInt(steps) });
  }
  return d;
}
