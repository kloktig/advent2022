import { read } from "../readFile";
const lines = read(7, "input.txt");

const a: any = { "/": { parent: "/" } };
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
          currentDir[arg] = { parent: currentDir };
        }
        currentDir = currentDir[arg];
      }
    }
  } else if (line.startsWith("dir")) {
    const d = line.substring(4);
    currentDir[d] = { parent: currentDir };
  } else if (Number.parseInt(line[0])) {
    const [size, name] = line.split(" ");
    currentDir[name] = size;
    if (!currentDir.size) currentDir.size = 0;
    currentDir.size += Number.parseInt(size);
  }
}

function pretty(obj: any, indent: number): string {
  let s = "";
  for (const k in obj) {
    if (k == "parent") continue;
    if (k == "size") continue;
    if (typeof obj[k] == "object" && obj[k] !== null) {
      s += "\t".repeat(indent) + k + "\n";
      s += pretty(obj[k], indent + 1);
    } else {
      s += "\t".repeat(indent) + k + ":" + obj[k] + "\n";
    }
  }
  return s;
}

console.log(pretty(a, 0));

const arr: number[] = [];
console.log(getSize(a["/"]));
console.log(arr.reduce((acc, v) => acc + v));

// This function handles arrays and objects
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
    console.log(k + ":" + s);
  }
  if (s <= 100000) arr.push(s);

  return s;
}
