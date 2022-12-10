import { read } from "../readFile";
const data: any = parse(read(9, "input.txt"));
type Pos = { x: number; y: number };
type Move = { op: string; steps: number };
const empty = (): Pos => ({ x: 0, y: 0 });

let visited: Pos[] = [];
let currentHead = empty();
let currentTail = empty();
for (const m of data) {
  [visited, currentHead, currentTail] = move(
    visited,
    currentHead,
    currentTail,
    m
  );
}
console.log(new Set(visited.map((v) => JSON.stringify(v))).size);

let visited2: Pos[] = [];
let currentHead2 = empty();
let knots = [
  empty(),
  empty(),
  empty(),
  empty(),
  empty(),
  empty(),
  empty(),
  empty(),
  empty(),
].slice(0);
for (const m of data) {
  [visited2, currentHead2, knots] = moveAll(visited2, currentHead2, knots, m);
}
console.log(visited2);
console.log(new Set(visited2.map((v) => JSON.stringify(v))).size);

function moveAll(
  visited: Pos[],
  currentHead: Pos,
  knots: Pos[],
  currentMove: Move
): [Pos[], Pos, Pos[]] {
  if (currentMove?.steps === 0) return [visited, currentHead, knots];
  else {
    const newHead = moveHead(currentHead, currentMove);
    let prev = newHead;
    let newKnots = [];
    for (const kn of knots) {
      let newKnot = moveTail(kn, prev);
      newKnots.push(newKnot);
      prev = newKnot;
    }
    visited.push(prev);
    return moveAll(visited, newHead, newKnots, {
      op: currentMove.op,
      steps: currentMove.steps - 1,
    });
  }
}

function move(
  visited: Pos[],
  currentHead: Pos,
  currentTail: Pos,
  currentMove: Move
): [Pos[], Pos, Pos] {
  if (currentMove?.steps === 0) return [visited, currentHead, currentTail];
  else {
    const newHead = moveHead(currentHead, currentMove);
    const newTail = moveTail(currentTail, newHead);
    visited.push(newTail);
    return move(visited, newHead, newTail, {
      op: currentMove.op,
      steps: currentMove.steps - 1,
    });
  }
}

function moveHead(pos: Pos, move: Move) {
  switch (move.op) {
    case "R":
      return { x: pos.x + 1, y: pos.y };
    case "L":
      return { x: pos.x - 1, y: pos.y };
    case "U":
      return { x: pos.x, y: pos.y + 1 };
    case "D":
      return { x: pos.x, y: pos.y - 1 };
    default:
      throw new Error();
  }
}

function moveTail(from: Pos, to: Pos): Pos {
  const x = from.x;
  const y = from.y;
  const a = to.x;
  const b = to.y;
  if (x == a && y - b == 2) return { x, y: y - 1 };
  else if (x == a && b - y == 2) return { x, y: y + 1 };
  else if (y == b && x - a == 2) return { x: x - 1, y };
  else if (y == b && a - x == 2) return { x: x + 1, y };
  else if (x + 1 == a && y + 2 == b) return { x: x + 1, y: y + 1 };
  else if (x + 1 == a && y - 2 == b) return { x: x + 1, y: y - 1 };
  else if (x + 2 == a && y + 1 == b) return { x: x + 1, y: y + 1 };
  else if (x + 2 == a && y - 1 == b) return { x: x + 1, y: y - 1 };
  else if (x - 1 == a && y + 2 == b) return { x: x - 1, y: y + 1 };
  else if (x - 1 == a && y - 2 == b) return { x: x - 1, y: y - 1 };
  else if (x - 2 == a && y + 1 == b) return { x: x - 1, y: y + 1 };
  else if (x - 2 == a && y - 1 == b) return { x: x - 1, y: y - 1 };
  else if (x + 2 == a && y + 2 == b) return { x: x + 1, y: y + 1 };
  else if (x + 2 == a && y - 2 == b) return { x: x + 1, y: y - 1 };
  else if (x - 2 == a && y + 2 == b) return { x: x - 1, y: y + 1 };
  else if (x - 2 == a && y - 2 == b) return { x: x - 1, y: y - 1 };
  else return { x, y };
}

function parse(lines: string[]) {
  const d = [];
  for (const line of lines) {
    const [op, steps] = line.split(" ");
    d.push({ op, steps: Number.parseInt(steps) });
  }
  return d;
}
