import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const CreatePostIcon = () => {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF6C00",
        height: "82%",
        width: 70,
        width: "54%",
        borderRadius: 20,
      }}
    >
      <Svg width="25px" height="25px" viewBox="0 0 25 25" fill="#fff">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6Z"
        />
      </Svg>
    </View>
  );
};

export default CreatePostIcon;
