import { FunctionComponent } from "react";
import { Platform, StyleSheet } from "react-native";
import ColorCodesInfo from "./ColorCodesInfo";
import ColorHistory from "./ColorHistory";
import CustomButton from "../CustomButton";
import { ColorHistoryType, ColorActionType } from "@/types/color.types";
import { SafeAreaView } from "react-native-safe-area-context";

type ColorInfoSheetProps = {
  randomColorHEX: string;
  randomColorRGB: string;
  setColor: ColorActionType;
  setNewRandomColor: () => void;
  colorHistory: ColorHistoryType;
  resetColorHistory: () => void;
  onPressClose: () => void;
};

const ColorInfoSheet: FunctionComponent<ColorInfoSheetProps> = ({
  randomColorHEX,
  randomColorRGB,
  setColor,
  setNewRandomColor,
  colorHistory,
  resetColorHistory,
  onPressClose,
}) => {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ColorCodesInfo colorHEX={randomColorHEX} colorRGB={randomColorRGB} />
      <ColorHistory
        setColor={setColor}
        setNewRandomColor={setNewRandomColor}
        colorHistory={colorHistory}
        resetColorHistory={resetColorHistory}
      />
      <CustomButton
        text="+"
        onPress={onPressClose}
        buttonStyle={styles.closeButton}
        textStyle={styles.closeButtonText}
      />
    </SafeAreaView>
  );
};

export default ColorInfoSheet;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    gap: 32,
  },
  closeButton: {
    padding: 0,
    position: "absolute",
    top: -8,
    right: -16,
    transform: [{ rotate: "45deg" }],
    borderWidth: 0,
  },
  closeButtonText: {
    fontSize: 32,
  },
});
