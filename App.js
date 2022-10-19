import { StyleSheet } from "react-native";
import BreathePage from "./src/views/BreathePage";

export default function App() {
  return (
    <BreathePage />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "center",
  }
});
