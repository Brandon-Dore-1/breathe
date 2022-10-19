import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const vw = (percentage) => {
  const viewportWidth = Dimensions.get("window").width;
  const decimal = percentage * 0.01;
  percentage = parseInt(percentage, 10);

  if (percentage < 0) {
    percentage = 100;
  }
  if (percentage > 1000) {
    percentage = 1000;
  }

  return Math.round(viewportWidth * decimal);
};

const Breather = (props) => {
  const { initialSeconds = 0 } = props;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [intervalId, setIntervalId] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const outerAnim = useRef(new Animated.Value(1)).current;

  const counter = () => {
    setIsLoading(true);
    if (!clicked) {
      let i = 0;
      let currentSecond = initialSeconds;
      let start = true;
      setClicked(true);
      const id = setInterval(() => {
        if (start) {
          setIntervalId(id);
          start = false;
        }
        currentSecond = Math.abs((i++ % (initialSeconds * 2)) - initialSeconds);
        setSeconds(currentSecond);
        if (currentSecond === 0) {
          Animated.timing(outerAnim, {
            toValue: 1,
            duration: (0.5 + initialSeconds) * 1000,
            useNativeDriver: false,
          }).start();
        }
        if (currentSecond === initialSeconds) {
          Animated.timing(outerAnim, {
            toValue: 0.55,
            duration: (0.5 + initialSeconds) * 1000,
            useNativeDriver: false,
          }).start();
        }
      }, 1000);
    } else {
      Animated.timing(outerAnim, {
        toValue: 1,
        duration: 1,
        useNativeDriver: false,
      }).start();
      clearInterval(intervalId);
      setSeconds(initialSeconds);
      setClicked(false);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <TouchableOpacity onPress={counter} disabled={isLoading}>
      <Animated.View
        style={{
          ...styles.outerCircle,
          transform: [{ scale: outerAnim }],
        }}
      ></Animated.View>
      <View style={styles.innerCircle}>
        <Text style={styles.circleText}>{seconds}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circleText: {
    lineHeight: vw(50),
    fontSize: vw(20),
    textAlign: "center",
    color: "white",
  },
  outerCircle: {
    width: vw(90),
    height: vw(90),
    borderRadius: vw(90) / 2,
    backgroundColor: "rgba(36,217,255, 0.85)",
  },
  innerCircle: {
    width: vw(50),
    height: vw(50),
    borderRadius: vw(50) / 2,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: "rgba(36,172,201, 1)",
    margin: vw(20),
  },
});

export default Breather;
