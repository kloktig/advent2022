import { read } from "../readFile";

const data: any = parse(read(9, "test.txt"));

function parse(lines: string[]) {
  const d = [];
  for (const line of lines) {
    const [op, steps] = line.split(" ");
    d.push({ op, steps: Number.parseInt(steps) });
  }
  return d;
}
type Pos = { x: number; y: number };
let H = { x: 0, y: 0 };
let T = { x: 0, y: 0 };
let visited = new Set<string>();
visited.add(JSON.stringify(T));
for (const move of data) {
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
    if (diff(T, H) > 1) T = temp;

    visited.add(JSON.stringify(T));
  }
}

function diff(a: Pos, b: Pos) {
  return Math.floor(
    Math.sqrt(
      Math.pow(Math.abs(b.x - a.x), 2) + Math.pow(Math.abs(b.y - a.y), 2)
    )
  );
}

let maxX = 0;
let maxY = 0;
let minX = 0;
let minY = 0;
const visitedArr: Pos[] = Array.from(visited).map((v) => JSON.parse(v) as Pos);

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
console.log(visited);
console.log(`silver: ${visited.size}`);
