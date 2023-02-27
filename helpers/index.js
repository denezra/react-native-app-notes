export function createRandomColor() {
  const char = "0123456789ABCDEF";
  let color = "#";

  for (let index = 0; index < 6; index++) {
    color += char[Math.floor(Math.random() * 16)];
  }

  return color;
}
