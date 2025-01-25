import { FC } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
  SharedValue,
} from "react-native-reanimated";

type Props = {
  isOpen: SharedValue<boolean>;
  toggleSheet: () => void;
  duration?: number;
  children: React.ReactNode;
};

export const BottomSheet: FC<Props> = ({
  isOpen,
  toggleSheet,
  duration = 500,
  children,
}) => {
  const height = useSharedValue(0);
  const progress = useDerivedValue(() =>
    withTiming(isOpen.value ? 0 : 1, { duration })
  );

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * 2 * height.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value
      ? 1
      : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  return (
    <>
      <Animated.View style={[sheetStyles.backdrop, backdropStyle]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={toggleSheet} />
      </Animated.View>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[sheetStyles.sheet, sheetStyle]}
      >
        {children}
      </Animated.View>
    </>
  );
};

const sheetStyles = StyleSheet.create({
  sheet: {
    padding: 16,
    height: 300,
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
    backgroundColor: "white",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
});
