import { LogoutIcon } from "../svgComponents";
import { TouchableOpacity } from "react-native";

export const LogoutHeader = () => {
  return (
    <TouchableOpacity
      style={{
        marginRight: 20,
      }}
      onPress={() => {
        console.log("logout");
      }}
    >
      <LogoutIcon />
    </TouchableOpacity>
  );
};
