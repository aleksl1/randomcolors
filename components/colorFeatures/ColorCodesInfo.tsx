import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Clipboard from "expo-clipboard";
import { ColorType } from "@/types/color.types";
import CustomButton from "../CustomButton";
import HelperText from "../HelperText";

type ColorCodesInfoProps = Pick<ColorType, "colorHEX" | "colorRGB">;

const ColorCodesInfo: FC<ColorCodesInfoProps> = ({ colorHEX, colorRGB }) => {
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };

  return (
    <View style={styles.container}>
      <HelperText text="color codes (copy)" />
      <View style={styles.colorInfo}>
        <CustomButton
          text={colorRGB}
          buttonStyle={styles.colorInfoButton}
          textStyle={styles.colorInfoText}
          onPress={() => copyToClipboard(colorRGB)}
          rightIcon={<Text>📄</Text>}
        />
        <CustomButton
          text={colorHEX}
          buttonStyle={styles.colorInfoButton}
          textStyle={styles.colorInfoText}
          onPress={() => copyToClipboard(colorHEX)}
          rightIcon={<Text>📄</Text>}
        />
      </View>
    </View>
  );
};

export default ColorCodesInfo;

const styles = StyleSheet.create({
  container: { gap: 8 },
  colorInfo: {
    flexDirection: "row",
    gap: 4,
  },
  colorInfoText: {
    fontSize: 16,
    fontWeight: "400",
    color: "white",
  },
  colorInfoButton: {
    backgroundColor: "black",
  },
});
