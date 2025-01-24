import { FC } from "react";
import { Text, StyleSheet } from "react-native";

type HelperTextProps = {
  text: string;
};

const HelperText: FC<HelperTextProps> = ({ text }) => {
  return <Text style={styles.helperText}>{text}</Text>;
};

export default HelperText;

const styles = StyleSheet.create({
  helperText: {
    fontSize: 16,
    color: "gray",
  },
});
