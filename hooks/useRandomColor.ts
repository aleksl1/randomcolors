import { Color, ColorAction } from "@/types/color.types";
import { initialColor } from "@/utils/constants";
import { generateRandomColor } from "@/utils/generateRandomColor";
import { useState } from "react";

const useRandomColor = (setRandomColorCb: ColorAction) => {
  const [randomColorRGB, setRandomColorRGB] = useState(initialColor.colorRGB);
  const [randomColorHEX, setRandomColorHEX] = useState(initialColor.colorHEX);
  const [contrastColor, setContrastColor] = useState(
    initialColor.contrastColor
  );

  const setNewRandomColor = () => {
    const { colorRGB, colorHEX, contrastColor } = generateRandomColor();
    setRandomColorRGB(colorRGB);
    setRandomColorHEX(colorHEX);
    setContrastColor(contrastColor);
    setRandomColorCb({ colorRGB, colorHEX, contrastColor });
  };
  const setColor = ({ colorHEX, colorRGB, contrastColor }: Color) => {
    setRandomColorHEX(colorHEX);
    setRandomColorRGB(colorRGB);
    setContrastColor(contrastColor);
  };

  return {
    randomColorRGB,
    randomColorHEX,
    contrastColor,
    setNewRandomColor,
    setColor,
  };
};

export default useRandomColor;
