import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Breather = (props) => {
  const { initialSeconds = 0 } = props;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [intervalId, setIntervalId] = React.useState(null);

  useEffect(() => {
    if (seconds <= 0) {
      clearInterval(intervalId);
      setTimeout(() => setSeconds(initialSeconds), 1000);
    }
  }, [seconds]);

  const countdown = () => {
    const id = setInterval(() => setSeconds((seconds) => seconds - 1), 1000);
    setIntervalId(id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.circle} onPress={countdown}>
        <Text style={styles.circleText}>{seconds}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  circleText: {
    lineHeight: "58vw",
    fontSize: "20vw",
    textAlign: "center",
    color: "white",
  },
  circle: {
    position: "relative",
    borderRadius: "50%",
    height: "60vw",
    width: "60vw",
    position: "relative",
    boxShadow: "0 0 0 15vw rgba(36,172,201, 0.8)",
    margin: "300px",
    lineHeight: "58vw",
    fontSize: "20vw",
    textAlign: "center",
    backgroundColor: "rgba(36,217,255, 0.8)",
  },
});

export default Breather;
