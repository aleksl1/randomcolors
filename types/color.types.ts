export enum ContrastColor {
  Black = "black",
  White = "white",
}

export type ColorType = {
  colorRGB: string;
  colorHEX: string;
  contrastColor: ContrastColor;
};

export type ColorActionType = (args: ColorType) => void;

export type ColorHistoryType = ColorType[];
