import { BottomSheet } from "@/components/BottomSheet";
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
import { useSharedValue } from "react-native-reanimated";

export default function Index() {
  const [colorHistory, setColorHistory] = useState<ColorHistoryType>([]);
  const isOpen = useSharedValue(false);

  const resetColorHistory = () => setColorHistory([]);
  const addDisplayedColorToHistory: ColorActionType = (color) => {
    setColorHistory((prev) => [color, ...prev]);
  };

  const {
    contrastColor,
    randomColorRGB,
    setNewRandomColor,
    randomColorHEX,
    setColor,
  } = useRandomColor(addDisplayedColorToHistory);

  const toggleSheet = () => {
    isOpen.value = !isOpen.value;
  };

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
        onPress={toggleSheet}
        buttonStyle={{
          ...styles.absoluteButton,
          backgroundColor: contrastColor,
        }}
        textStyle={{ color: randomColorRGB }}
      />
      <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet}>
        <ColorInfoSheet
          randomColorHEX={randomColorHEX}
          randomColorRGB={randomColorRGB}
          setColor={setColor}
          setNewRandomColor={setNewRandomColor}
          colorHistory={colorHistory}
          resetColorHistory={resetColorHistory}
          onPressClose={toggleSheet}
        />
      </BottomSheet>
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
