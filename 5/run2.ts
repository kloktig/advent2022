import { read } from "../readFile";
const lines = read(5, "input.txt");
const indexes = [...Array(9).keys()].map((n) => 4 * n + 1);
const stacks: string[][] = [];
const instructions = [];
const t0 = performance.now();

for (const _ of indexes) {
  stacks.push([]);
}
for (const line of lines) {
  if (line.includes("[")) {
    const values = Array.from(line);
    indexes.forEach((index, idx) => {
      const v = values[index];
      if (v?.match(/[A-Z]/i)) {
        stacks[idx].push(v);
      }
    });
  } else if (line.includes("move")) {
    const spl = line.split(" ");
    instructions.push({
      move: Number.parseInt(spl[1]),
      from: Number.parseInt(spl[3]) - 1,
      to: Number.parseInt(spl[5]) - 1,
    });
  }
}

for (const stack of stacks) {
  stack.reverse();
}
for (const instr of instructions) {
  const temp: string[] = [];
  for (let i = 0; i < instr.move; i++) {
    temp.push(stacks[instr.from].pop()!);
  }
  let e = undefined;
  while ((e = temp.pop())) {
    stacks[instr.to].push(e);
  }
}
const t1 = performance.now();

console.log(`Run 2: ${stacks.map((v) => v.slice(-1)).join("")}`);
console.log(`${(t1 - t0).toFixed()} ms`);
