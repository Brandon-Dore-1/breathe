import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Alert,
  Text,
} from "react-native";
import Breather from "../components/Breather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const BreathePage = ({ navigation }) => {
  const [circleOption, setcircleOption] = useState("Countdown");
  const [breatheTime, setBreatheTime] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      Alert.alert("Error", "There was an error saving your settings.");
    }
  };

  const fetchOrCreateSettings = async () => {
    try {
      const breatheTimeTemp = await AsyncStorage.getItem("breatheTime");
      const circleOptionTemp = await AsyncStorage.getItem("circleOption");
      if (breatheTimeTemp !== null && circleOptionTemp !== null) {
        setBreatheTime(parseInt(breatheTimeTemp));
        setcircleOption(circleOptionTemp);
      } else {
        storeData("breatheTime", 5);
        storeData("circleOption", "Countdown");
      }
      setLoading(false);
    } catch (e) {
      Alert.alert("Error", "There was an error retrieving your settings.");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchOrCreateSettings();
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
        onPress={() => navigation.navigate("SettingsModal")}
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
