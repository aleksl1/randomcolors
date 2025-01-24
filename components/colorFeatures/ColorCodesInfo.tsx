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
      }, 1500);
    });
    return () => {
      clearTimeout(timeout);
      Clipboard.removeClipboardListener(subscription);
    };
  }, []);

  return (
    <View style={styles.container}>
      <HelperText text="color codes (copy)" />
      <View style={styles.colorInfo}>
        <View>
          <CustomButton
            text={colorRGB}
            buttonStyle={styles.colorInfoButton}
            textStyle={styles.colorInfoText}
            onPress={() => copyToClipboard(colorRGB)}
            rightIcon={<Text>📄</Text>}
          />
          {copied === "rgb" && (
            <HelperText text="copied" textStyle={styles.copiedText} />
          )}
        </View>
        <View>
          <CustomButton
            text={colorHEX}
            buttonStyle={styles.colorInfoButton}
            textStyle={styles.colorInfoText}
            onPress={() => copyToClipboard(colorHEX)}
            rightIcon={<Text>📄</Text>}
          />
          {copied === "hex" && (
            <HelperText text="copied" textStyle={styles.copiedText} />
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
    right: 60,
  },
});
