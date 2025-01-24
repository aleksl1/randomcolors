import ColorInfoSheet from "@/components/colorFeatures/ColorInfoSheet";
import CustomButton from "@/components/CustomButton";
import useRandomColor from "@/hooks/useRandomColor";
import { ColorActionType, ColorHistoryType } from "@/types/color.types";
import { useState } from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";

export default function Index() {
  const [showColorInfoSheet, setShowColorInfoSheet] = useState(false);
  const [colorHistory, setColorHistory] = useState<ColorHistoryType>([]);

  const resetColorHistory = () => setColorHistory([]);
  const addDisplayedColorToHistory: ColorActionType = (color) => {
    setColorHistory((prev) => [...prev, color]);
  };

  const {
    contrastColor,
    randomColorRGB,
    setNewRandomColor,
    randomColorHEX,
    setColor,
  } = useRandomColor(addDisplayedColorToHistory);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable
        style={[
          styles.container,
          {
            backgroundColor: randomColorRGB,
          },
        ]}
        onPress={setNewRandomColor}
      >
        <Text style={[styles.mainText, { color: contrastColor }]}>
          Hello there
        </Text>
      </Pressable>
      <CustomButton
        text="Info"
        onPress={() => setShowColorInfoSheet(true)}
        buttonStyle={{
          ...styles.absoluteButton,
          backgroundColor: contrastColor,
        }}
        textStyle={{ color: randomColorRGB }}
      />
      {showColorInfoSheet && (
        <ColorInfoSheet
          randomColorHEX={randomColorHEX}
          randomColorRGB={randomColorRGB}
          setColor={setColor}
          setNewRandomColor={setNewRandomColor}
          colorHistory={colorHistory}
          resetColorHistory={resetColorHistory}
          setShowSettings={setShowColorInfoSheet}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  mainText: { fontSize: 32 },
  absoluteButton: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 64 : 24,
    right: 24,
    borderWidth: 0,
  },
});
