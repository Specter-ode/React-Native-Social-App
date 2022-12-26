import { LogoutIcon } from "../svgComponents";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../redux/auth/auth-operations";
import { Feather } from "@expo/vector-icons";

export const LogoutHeader = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(handleLogout());
  };
  return (
    <TouchableOpacity
      style={{
        marginRight: 20,
      }}
      onPress={() => {
        onLogout();
      }}
    >
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};
