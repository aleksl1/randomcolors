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
  setShowSettings: (show: boolean) => void;
};

const ColorInfoSheet: FunctionComponent<ColorInfoSheetProps> = ({
  randomColorHEX,
  randomColorRGB,
  setColor,
  setNewRandomColor,
  colorHistory,
  resetColorHistory,
  setShowSettings,
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
        onPress={() => setShowSettings(false)}
        buttonStyle={styles.closeButton}
        textStyle={styles.closeButtonText}
      />
    </SafeAreaView>
  );
};

export default ColorInfoSheet;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 32,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  closeButton: {
    padding: 0,
    position: "absolute",
    top: 0,
    right: -8,
    transform: [{ rotate: "45deg" }],
    borderWidth: 0,
  },
  closeButtonText: {
    fontSize: 32,
  },
});
