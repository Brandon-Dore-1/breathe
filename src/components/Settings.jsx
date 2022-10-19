import React from "react";
import { StyleSheet, TouchableHighlight, Image, View } from "react-native";

const Settings = () => {
  return (
    <View>
      <TouchableHighlight
        onPress={() => this.moveToAddNewCustomer()}
        style={styles.imagecontainer}
      >
        <Image
          source={require("../img/settings.png")}
          resizeMode="contain"
          style={styles.imagestyle}
        />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  imagecontainer: {
    position: "fixed",
    right: 0,
    top: 0,
  },
  imagestyle: {
    height: 50,
    width: 50,
  },
});

export default Settings;
