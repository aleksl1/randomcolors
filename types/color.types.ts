export enum ContrastColor {
  Black = "black",
  White = "white",
}

export type Color = {
  colorRGB: string;
  colorHEX: string;
  contrastColor: ContrastColor;
};
