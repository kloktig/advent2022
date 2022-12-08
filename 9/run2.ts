import { read } from "../readFile";
// const data: any = parse(read(9, "input.txt"));
const data: any = parse(read(9, "test.txt"));

function parse(lines: string[]) {
  const d = [];
  for (const line of lines) {
    const spl = line.split("").map((v) => v);
    d.push(spl);
  }
  return d;
}

console.log(`gold: ${data.length}`);
