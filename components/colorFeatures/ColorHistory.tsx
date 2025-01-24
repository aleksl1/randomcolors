import { ColorHistoryType, ColorActionType } from "@/types/color.types";
import { FC } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import CustomButton from "../CustomButton";
import HelperText from "../HelperText";

type ColorHistoryProps = {
  setColor: ColorActionType;
  setNewRandomColor: () => void;
  resetColorHistory: () => void;
  colorHistory: ColorHistoryType;
};

const ColorHistory: FC<ColorHistoryProps> = ({
  setColor,
  setNewRandomColor,
  resetColorHistory,
  colorHistory,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.historyHeader}>
        <HelperText text={`color history (${colorHistory?.length})`} />
        <CustomButton
          text="clear"
          onPress={resetColorHistory}
          buttonStyle={styles.resetButton}
          textStyle={styles.resetButtonText}
        />
      </View>
      <View style={styles.historyList}>
        <Pressable
          style={[styles.historyAdd, styles.historyItem]}
          onPress={setNewRandomColor}
        >
          <Text style={styles.historyAddText}>+</Text>
        </Pressable>
        {colorHistory.map(({ colorRGB, colorHEX, contrastColor }, index) => (
          <Pressable
            onPress={() => setColor({ colorRGB, colorHEX, contrastColor })}
            key={`${colorHEX}-${index}`}
            style={[
              {
                backgroundColor: colorRGB,
              },
              styles.historyItem,
            ]}
          ></Pressable>
        ))}
      </View>
    </View>
  );
};

export default ColorHistory;

const colorItemSize = 50;

const styles = StyleSheet.create({
  container: { gap: 8 },
  historyHeader: {
    flexDirection: "row",
    gap: 4,
  },
  resetButton: {
    borderWidth: 0,
    padding: 0,
  },
  resetButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  historyList: {
    flexDirection: "row",
    gap: 4,
    flexWrap: "wrap",
    minHeight: colorItemSize,
  },
  historyAdd: {
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
  },
  historyAddText: { fontSize: 26, textAlign: "center", marginTop: -2 },
  historyItem: {
    width: colorItemSize,
    height: colorItemSize,
    borderRadius: 16,
  },
});
