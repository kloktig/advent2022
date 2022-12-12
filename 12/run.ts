import {read} from "../readFile";

const map: any = parse(read(12, "test.txt"));

function parse(lines: string[]) {
  const map = [];
  const e = Array(lines[0].length).map(v => v)
  for (const line of lines) {
    const spl = line
      .split("")
      .map((v) => ({heigth: v.charCodeAt(0) - 97, possible: []}));
    map.push(spl);
  }
  return map;
}

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map.length; x++) {
    if()
  }
}
console.log("silver: ");
console.log(map);
console.log("a".charCodeAt(0) - 97);
console.log("x".charCodeAt(0) - 97);
console.log("S".charCodeAt(0) - 97);
