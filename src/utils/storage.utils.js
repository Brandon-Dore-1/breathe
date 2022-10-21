import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    Alert.alert("Error", "There was an error saving your settings.");
  }
};

export const fetchData = async () => {
  try {
    const breatheTime = await AsyncStorage.getItem("breatheTime");
    const circleOption = await AsyncStorage.getItem("circleOption");
    return { breatheTime: parseInt(breatheTime), circleOption: circleOption };
  } catch (e) {
    Alert.alert("Error", "There was an error retrieving your settings.");
  }
};

export const fetchOrCreateSettings = async () => {
  try {
    const data = fetchData();
    if (data.breatheTime !== null && data.circleOptionTemp !== null) {
      return data
    } else {
      storeData("breatheTime", 5);
      storeData("circleOption", "Countdown");
    }
    setLoading(false);
  } catch (e) {
    Alert.alert("Error", "There was an error retrieving your settings.");
  }
};
