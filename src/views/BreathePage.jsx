import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Text,
} from "react-native";
import Breather from "../components/Breather";
import { useIsFocused } from "@react-navigation/native";
import { fetchOrCreateSettings } from "../utils/storage.utils";

const BreathePage = ({ navigation }) => {
  const [circleOption, setcircleOption] = useState("null");
  const [breatheTime, setBreatheTime] = useState("");
  const [isLoading, setLoading] = useState(true);
  navigation.setOptions({ headerShown: false })
  const isFocused = useIsFocused();

  useEffect(() => {
    const setData = async () => {
      setLoading(true);
      const data = await fetchOrCreateSettings();
      setcircleOption(data.circleOption);
      setBreatheTime(data.breatheTime);
      setLoading(false);
    };
    setData();
  }, [isFocused]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => navigation.navigate("Settings")}
        style={styles.settingsContainer}
      >
        <Image
          source={require("../img/settings.png")}
          resizeMode="contain"
          style={styles.settingsImg}
        />
      </TouchableHighlight>
      <Breather initialSeconds={breatheTime} circleOption={circleOption} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsContainer: {
    alignSelf: "flex-end",
    marginTop: -5,
  },
  settingsImg: {
    height: 50,
    width: 50,
  },
});

export default BreathePage;
