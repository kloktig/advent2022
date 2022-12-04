import board from "./board.json";
const members = Object.entries(board.members);
let arr = [];
for (const [id, user] of members) {
  const u = {
    key: id,
    stars: user.stars,
    name: user.name,
    score: user.local_score,
    days: "",
  };

  for (const [day, stars] of Object.entries(user.completion_day_level)) {
    const star1 = new Date(stars[1].get_star_ts * 1000);
    let diff = 0;
    if (stars[2]) {
      diff = (stars[2].get_star_ts - stars[1].get_star_ts) / 60;
    }
    u.days += getTime(star1) + "->" + diff.toFixed(1) + ", ";
  }
  arr.push(u);
}
arr.sort((a, b) => b.score - a.score);

console.table(arr);

function getTime(date: Date) {
  return date
    .toLocaleString()
    .match(/(\d{2}:){2}\d{2}/)![0]
    .toString();
}
