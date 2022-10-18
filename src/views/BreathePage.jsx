import { StyleSheet, View } from "react-native";
import Breather from "../components/Breather";
import Settings from "../components/Settings";

const BreathePage = () => {
  return (
    <View style={styles.container}>
      <Settings />
      <Breather initialSeconds={5} />
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
});

export default BreathePage;
