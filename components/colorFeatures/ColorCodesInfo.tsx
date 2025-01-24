import { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Clipboard from "expo-clipboard";
import { ColorType } from "@/types/color.types";
import CustomButton from "../CustomButton";
import HelperText from "../HelperText";

type ColorCodesInfoProps = Pick<ColorType, "colorHEX" | "colorRGB">;

const ColorCodesInfo: FC<ColorCodesInfoProps> = ({ colorHEX, colorRGB }) => {
  const [copied, setCopied] = useState<"hex" | "rgb" | null>(null);

  const copyToClipboard = async (text: string) =>
    await Clipboard.setStringAsync(text);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const subscription = Clipboard.addClipboardListener(async () => {
      const content = await Clipboard.getStringAsync();
      content[0] === "#" ? setCopied("hex") : setCopied("rgb");
      timeout = setTimeout(() => {
        setCopied(null);
      }, 1000);
    });
    return () => {
      clearTimeout(timeout);
      Clipboard.removeClipboardListener(subscription);
    };
  }, []);

  const copyColorButtonCommonProps = {
    buttonStyle: styles.colorInfoButton,
    textStyle: styles.colorInfoText,
    rightIcon: <Text>📄</Text>,
  };

  return (
    <View style={styles.container}>
      <HelperText text="color codes (copy)" />
      <View style={styles.colorInfo}>
        <View>
          <CustomButton
            text={colorRGB}
            onPress={() => copyToClipboard(colorRGB)}
            {...copyColorButtonCommonProps}
          />
          {copied === "rgb" && (
            <HelperText
              text="✔️ copied"
              textStyle={[styles.copiedText, styles.copiedRgbText]}
            />
          )}
        </View>
        <View>
          <CustomButton
            text={colorHEX}
            onPress={() => copyToClipboard(colorHEX)}
            {...copyColorButtonCommonProps}
          />
          {copied === "hex" && (
            <HelperText
              text="✔️ copied"
              textStyle={[styles.copiedText, styles.copiedHexText]}
            />
          )}
        </View>
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
  copiedText: {
    position: "absolute",
    bottom: -20,
  },
  copiedRgbText: {
    right: 60,
  },
  copiedHexText: {
    right: 20,
  },
});
