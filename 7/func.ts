export function parse(lines: string[]) {
  const tree: any = {"/": {parent: "/"}};
  let currentDir: any;
  for (const line of lines) {
    const command = getCommand(line);
    if (command && command !== "ls") {
      const arg = getArg(line);
      switch (arg) {
        case "..":
          currentDir = currentDir.parent;
          break;
        case "/":
          currentDir = tree["/"];
        default:
          if (!currentDir[arg]) {
            currentDir[arg] = {parent: currentDir};
          }
          currentDir = currentDir[arg];
          break;
      }
    } else if (isDirectory(line)) {
      currentDir[getDirectory(line)] = {parent: currentDir};
    } else if (isFile(line)) {
      const [size, name] = line.split(" ");
      currentDir[name] = size;
      if (!currentDir.size) currentDir.size = 0;
      currentDir.size += Number.parseInt(size);
    }
  }
  return tree;
}

function isCommand(line: string) {
  return line.startsWith("$");
}

function getCommand(line: string) {
  return isCommand(line) ? line.substring(2, 4) : false;
}

function isDirectory(line: string) {
  return line.startsWith("dir");
}

function getDirectory(line: string) {
  return line.substring(4);
}

function isFile(line: string): boolean {
  return !isNaN(Number.parseInt(line[0]));
}

function getArg(line: string) {
  if (!isCommand(line)) throw new Error(`Problem parsing: '${line}'`);
  return line.substring(5);
}

export function calculate(
  obj: any,
  arr: number[],
  check: (n: number) => boolean
) {
  let s = 0;
  for (var k in obj) {
    if (k === "parent") continue;
    if (k === "size") {
      s += obj.size;
    } else if (typeof obj[k] == "object") {
      s += calculate(obj[k], arr, check);
    } else {
    }
  }
  if (check(s)) arr.push(s);
  return s;
}
