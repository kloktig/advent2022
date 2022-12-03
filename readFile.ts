import fs from "fs";
import path from "path";

export function read(day: number, file: string) {
  const p = path.join(__dirname, day.toString(), file);
  return fs.readFileSync(p, "utf8").toString().split("\n");
}
