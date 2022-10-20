class Utils {
  StoreData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      Alert.alert("Error", "There was an error saving your settings.");
    }
  };
  
}
export default new Utils();