import { FC, ReactNode } from "react";
import {
  Pressable,
  PressableProps,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextProps,
  TextStyle,
} from "react-native";

type CustomButtonProps = {
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textProps?: TextProps;
  rightIcon?: ReactNode;
} & PressableProps;

const CustomButton: FC<CustomButtonProps> = ({
  text,
  buttonStyle,
  textProps,
  textStyle,
  rightIcon,
  ...props
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.button,
        buttonStyle,
      ]}
      {...props}
    >
      <Text style={[styles.text, textStyle]} {...textProps}>
        {text}
      </Text>
      {rightIcon}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    flexDirection: "row",
    gap: 16,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
});
