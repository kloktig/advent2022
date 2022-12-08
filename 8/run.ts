import {read} from "../readFile";

const map: any = parse(read(8, "input.txt"));

function parse(lines: string[]) {
  const map = [];
  for (const line of lines) {
    const spl = line
      .split("")
      .map((v) => ({heigt: Number.parseInt(v), visble: false}));
    map.push(spl);
  }
  return map;
}

let maxVisible = -1;

for (let i = 0; i < map.length; i++) {
  maxVisible = -1;
  for (let j = 0; j < map[0].length; j++) {
    checkVisible(i, j);
  }
}

for (let j = 0; j < map[0].length; j++) {
  maxVisible = -1;
  for (let i = 0; i < map.length; i++) {
    checkVisible(i, j);
  }
}

for (let i = 0; i < map.length; i++) {
  maxVisible = -1;
  for (let j = map[0].length - 1; j >= 0; j--) {
    checkVisible(i, j);
  }
}

for (let j = 0; j < map[0].length; j++) {
  maxVisible = -1;
  for (let i = map.length - 1; i >= 0; i--) {
    checkVisible(i, j);
  }
}

function checkVisible(i: number, j: number) {
  const v = map[i][j];
  if (v.heigt > maxVisible) {
    maxVisible = v.heigt;
    map[i][j].visble = true;
  }
}

console.log(
  "silver: " + map.map((m: any[]) => m.filter((v) => v.visble)).flat().length
);
