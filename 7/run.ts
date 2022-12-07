import {read} from "../readFile";
const lines = read(7, "input.txt");

const a: any = {"/": {parent: "/"}};
let currentDir: any = a["/"];
for (const line of lines) {
  if (line.startsWith("$")) {
    const command = line.substring(2, 4);
    if (command == "ls") {
    } else {
      const arg = line.substring(5);
      if (arg.startsWith(".")) {
        currentDir = currentDir.parent;
      } else if (arg.startsWith("/")) {
        currentDir = a["/"];
      } else {
        if (!currentDir[arg]) {
          currentDir[arg] = {parent: currentDir};
        }
        currentDir = currentDir[arg];
      }
    }
  } else if (line.startsWith("dir")) {
    const d = line.substring(4);
    currentDir[d] = {parent: currentDir};
  } else if (Number.parseInt(line[0])) {
    const [size, name] = line.split(" ");
    currentDir[name] = size;
    if (!currentDir.size) currentDir.size = 0;
    currentDir.size += Number.parseInt(size);
  }
}
function solve1() {
  const arr: number[] = [];
  return {size: getSize(a), solve: arr.reduce((acc, v) => acc + v)};

  function getSize(obj: any): number {
    let s = 0;
    for (var k in obj) {
      if (k === "parent") continue;
      if (k === "size") {
        s += obj.size;
      } else if (typeof obj[k] == "object") {
        s += getSize(obj[k]);
      } else {
      }
    }
    if (s <= 100000) arr.push(s);

    return s;
  }
}

// This function handles arrays and objects
function solve2() {
  const tres = solve1().size - 40000000;
  const arr: number[] = [];
  solve(a);
  return Math.min(...arr);

  function solve(obj: any): number {
    let s = 0;
    for (var k in obj) {
      if (k === "parent") continue;
      if (k === "size") {
        s += obj.size;
      } else if (typeof obj[k] == "object") {
        s += solve(obj[k]);
      } else {
      }
    }
    if (s >= tres) arr.push(s);

    return s;
  }
}

console.log("silver: " + solve1().solve);
console.log("gold: " + solve2());
