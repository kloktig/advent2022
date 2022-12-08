import { read } from "../readFile";

function solve1() {
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

  return "super " + data.length;
}

function solve2() {
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

  return "duper " + data.length;
}

console.log(`silver: ${solve1()}`);
console.log(`gold: ${solve2()}`);
