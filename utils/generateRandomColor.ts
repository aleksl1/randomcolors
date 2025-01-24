import { ContrastColor } from "@/types/color.types";

const getRandomRGBValue = () => Math.floor(Math.random() * 256);

export const generateRandomColor = () => {
  const r = getRandomRGBValue();
  const g = getRandomRGBValue();
  const b = getRandomRGBValue();
  return {
    colorRGB: `rgb(${r}, ${g}, ${b})`,
    colorHEX: `#${decimalToHex(r)}${decimalToHex(g)}${decimalToHex(b)}`,
    contrastColor: getContrastColor({ r, g, b }),
  };
};

//source for contrast color condition: https://ux.stackexchange.com/a/151290
const getContrastColor = ({ r, g, b }: { r: number; g: number; b: number }) => {
  if (g > 180 || r + g + b > 450) return ContrastColor.Black;
  return ContrastColor.White;
};

export const decimalToHex = (decimal: number) => {
  if (decimal < 0) decimal = 0;
  if (decimal > 255) decimal = 255;
  return decimal.toString(16).padStart(2, "0");
};
