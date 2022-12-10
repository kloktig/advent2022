import { getRegisterStates } from "./run";

const sprites = getRegisterStates().slice(0, 240);
const crtPositions = [...Array(240).keys()];

function shouldDrawPixel(position: number, crtPos: number) {
  if (crtPos === position) return true;
  if (position % 40 !== 0 && crtPos === position - 1) return true;
  if (position % 40 !== 39 && crtPos === position + 1) return true;
  return false;
}

let str = "";
for (let i = 0; i < sprites.length; i++) {
  if (i % 40 === 0) str += "\n";
  const sprite = sprites[i];
  const crtPosition = crtPositions[i];
  const should = shouldDrawPixel(sprite, crtPosition % 40);
  str += should ? "@" : " ";
}

console.log("Gold: ");
console.log(str);
