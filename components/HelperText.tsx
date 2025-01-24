import { FC } from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";

type HelperTextProps = {
  text: string;
  textStyle?: StyleProp<TextStyle>;
};

const HelperText: FC<HelperTextProps> = ({ text, textStyle }) => {
  return <Text style={[styles.helperText, textStyle]}>{text}</Text>;
};

export default HelperText;

const styles = StyleSheet.create({
  helperText: {
    fontSize: 16,
    color: "gray",
  },
});
