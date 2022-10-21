import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Text, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchData } from "../utils/storage.utils";

const SettingsModal = ({ navigation }) => {
  const [circleOption, setcircleOption] = useState("");
  const [breatheTime, setBreatheTime] = useState("");

  useEffect(() => {
    const setData = async () => {
      const data = await fetchData();
      setcircleOption(data.circleOption);
      setBreatheTime(data.breatheTime);
    };
    setData();
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      Alert.alert("Error", "There was an error saving your settings.");
    }
  };

  const onChangeBreatheTime = (value) => {
    const numericRegex = /^(?:[0-9]|[12][0-9]|3[01])$/;
    if (numericRegex.test(value)) {
      setBreatheTime(value);
      storeData("breatheTime", value);
    }
  };

  const onChangeCircleOption = (value) => {
    setcircleOption(value);
    storeData("circleOption", value);
  };

  return (
    <View style={styles.modalView}>
      <Text style={styles.modalText}>Countdown Numbers</Text>
      <View style={styles.fixToText}>
        <Button
          title="Countdown"
          onPress={() => onChangeCircleOption("Countdown")}
          color={circleOption === "Countdown" ? "" : "#808080"}
        />
        <Button
          title="Instructional"
          onPress={() => onChangeCircleOption("Instructional")}
          color={circleOption === "Instructional" ? "" : "#808080"}
        />
        <Button
          title="Empty"
          onPress={() => onChangeCircleOption("Empty")}
          color={circleOption === "Empty" ? "" : "#808080"}
        />
      </View>
      <Text style={styles.modalText}>Length of each breath (1-30 seconds)</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder={"Enter number here"}
            keyboardType="numeric"
            onChangeText={onChangeBreatheTime}
            value={breatheTime}
          />
        </View>
      </TouchableWithoutFeedback>

      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 20,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 3,
  },
});

export default SettingsModal;
