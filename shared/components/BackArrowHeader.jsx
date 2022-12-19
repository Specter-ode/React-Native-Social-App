import { GoBackIcon } from "../svgComponents";
import { TouchableOpacity } from "react-native";

export const BackArrowHeader = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        marginLeft: 20,
      }}
      onPress={() => navigation.goBack()}
    >
      <GoBackIcon />
    </TouchableOpacity>
  );
};
