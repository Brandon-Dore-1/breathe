import {
  Dimensions
} from "react-native";

export const vw = (percentage) => {
  const viewportWidth = Dimensions.get("window").width;
  const decimal = percentage * 0.01;
  percentage = parseInt(percentage, 10);

  if (percentage < 0) {
    percentage = 100;
  }
  if (percentage > 1000) {
    percentage = 1000;
  }

  return Math.round(viewportWidth * decimal);
};
