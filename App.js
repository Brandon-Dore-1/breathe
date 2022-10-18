import { StyleSheet, Text, View } from "react-native";
import BreathePage from "./src/views/BreathePage";

export default function App() {
  return (
    <View style={styles.container}>
      <BreathePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  }
});
