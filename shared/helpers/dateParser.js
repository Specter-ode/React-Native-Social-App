import { Platform } from "react-native";

export const dateParser = (date, parseType) => {
  if (parseType === "fullDate") {
    if (Platform.OS === "android") {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const dateArr = new Date(date).toLocaleDateString().split("/");
      dateArr.splice(2, 1, "2022");
      const slicedDate = dateArr.slice(1, 3);
      slicedDate.splice(1, 0, dateArr[0]);
      return `${slicedDate.join(".")} | ${new Date(date)
        .toTimeString()
        .split(":")
        .slice(0, 2)
        .join(":")}`;
    }
    return new Date(date)
      .toLocaleString()
      .split(", ")
      .join(" | ")
      .split(":")
      .slice(0, 2)
      .join(":");
  }

  if (Platform.OS === "android") {
    const dateArr = new Date(date).toLocaleDateString().split("/");
    dateArr.splice(2, 1, "2022");
    const slicedDate = dateArr.slice(1, 3);
    slicedDate.splice(1, 0, dateArr[0]);
    return slicedDate.join(".");
  }
  return new Date(date).toLocaleDateString();
};
