import { read } from "../readFile";

const map: any = parse(read(8, "input.txt"));

function parse(lines: string[]) {
  const map = [];
  for (const line of lines) {
    const spl = line.split("").map((v) => Number.parseInt(v));
    map.push(spl);
  }
  return map;
}

let maxScore = 0;

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[0].length; j++) {
    const v = map[i][j];

    let uIdx = 1;
    let upcount = 0;
    while (true) {
      const value = map[i - uIdx];
      if (value === undefined) break;
      upcount++;
      if (value[j] >= v) break;
      uIdx++;
    }

    let dIdx = 1;
    let downcount = 0;
    while (true) {
      const value = map[i + dIdx];
      if (value === undefined) break;
      downcount++;
      if (value[j] >= v) break;
      dIdx++;
    }

    let lIdx = 1;
    let leftCount = 0;
    while (true) {
      const value = map[i][j - lIdx];
      if (value === undefined) break;
      leftCount++;
      if (value >= v) break;
      lIdx++;
    }

    let rIdx = 1;
    let rightcount = 0;
    while (true) {
      const value = map[i][j + rIdx];
      if (value === undefined) break;
      rightcount++;
      if (value >= v) break;
      rIdx++;
    }

    const score = upcount * downcount * leftCount * rightcount;

    if (score > maxScore) {
      maxScore = score;
    }
  }
}
console.log("gold: " + maxScore);
