import { read } from "../readFile";

const map: any = parse(read(8, "test.txt"));

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
    let upMax = -1;
    let upcount = 0;
    while (i - uIdx >= 0 && map[i - uIdx][j] >= upMax) {
      if (upcount > 0 && v < map[i - uIdx][j] && map[i - uIdx][j] < upMax)
        break;
      upMax = map[i - uIdx][j];
      upcount++;
      uIdx++;
    }

    let dIdx = 1;
    let downMax = -1;
    let downcount = 0;
    while (i + dIdx < map.length && map[i + dIdx][j] >= downMax) {
      if (downcount > 0 && v < map[i + dIdx][j] && map[i + dIdx][j] < downMax)
        break;
      downMax = map[i + dIdx][j];
      downcount++;
      dIdx++;
    }

    let lIdx = 1;
    let leftMax = -1;
    let leftCount = 0;
    while (i - lIdx >= 0 && map[i][j - lIdx] >= leftMax) {
      if (leftCount > 0 && v < map[i][j - lIdx] && map[i][j - lIdx] < leftMax)
        break;
      leftMax = map[i][j - lIdx];
      leftCount++;
      lIdx++;
    }
    if (leftCount > 1 && map[i][j] < map[i][j - lIdx]) leftCount--;

    let rIdx = 1;
    let rightMax = -1;
    let rightcount = 0;
    while (i + rIdx <= map.length && map[i][j + rIdx] >= rightMax) {
      if (rightcount > 0 && v < map[i][j + rIdx] && map[i][j + rIdx] < rightMax)
        break;
      rightMax = map[i][j + rIdx];
      rightcount++;
      rIdx++;
    }
    console.log(
      `${i},${j}(${map[i][j]}): ${upcount}*${leftCount}*${downcount}*${rightcount}`
    );
    const score = upcount * downcount * leftCount * rightcount;
    console;
    if (score > maxScore) {
      maxScore = score;
    }
  }
}

console.log(maxScore);
