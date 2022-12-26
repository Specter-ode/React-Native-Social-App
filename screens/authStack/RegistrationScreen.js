import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { AvatarBoxIcon } from "../../shared/svgComponents";
import { useDispatch } from "react-redux";
import { handleRegistration } from "../../redux/auth/auth-operations";
import * as ImagePicker from "expo-image-picker";

const initialState = {
  name: "",
  email: "",
  password: "",
  avatar: null,
};

const initialStateFocus = {
  name: "",
  email: "",
  password: "",
};
const RegistrationScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isFocused, setIsFocused] = useState(initialStateFocus);

  const dispatch = useDispatch();

  const getImageFromLibrary = async () => {
    if (state.avatar) {
      return setState((prevState) => ({
        ...prevState,
        avatar: null,
      }));
    }
    let file = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });

    if (!file.canceled) {
      setState((prevState) => ({ ...prevState, avatar: file.assets[0].uri }));
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  const handleInputFocus = (inputName) => {
    setIsFocused({
      ...isFocused,
      [inputName]: true,
    });
    setIsShowKeyboard(true);
  };
  const handleInputBlur = (inputName) => {
    setIsFocused({
      ...isFocused,
      [inputName]: false,
    });
  };
  const onSubmit = () => {
    dispatch(handleRegistration(state));
    setState(initialState);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <ImageBackground
            style={styles.image}
            source={require("../../assets/images/background.jpg")}
          >
            <StatusBar style="auto" />

            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 66,
              }}
            >
              <View style={styles.avatar}>
                {state.avatar ? (
                  <>
                    <Image
                      style={styles.avatarImage}
                      source={{ uri: state.avatar }}
                    />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.iconBlock}
                      onPress={getImageFromLibrary}
                    >
                      <AvatarBoxIcon
                        style={{
                          ...styles.avatarBoxIcon,
                          transform: [{ rotate: "45deg" }],
                        }}
                        fill="#BDBDBD"
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={styles.iconBlock}
                    activeOpacity={0.7}
                    onPress={getImageFromLibrary}
                  >
                    <AvatarBoxIcon
                      style={{
                        ...styles.avatarBoxIcon,
                      }}
                      fill="#BDBDBD"
                    />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.title}>Регистрация</Text>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isFocused.name ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isFocused.name ? "#fff" : "#F6F6F6",
                }}
                placeholder="Логин"
                placeholderTextColor="#BDBDBD"
                onFocus={() => {
                  handleInputFocus("name");
                }}
                onBlur={() => {
                  handleInputBlur("name");
                }}
                value={state.name}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, name: value }))
                }
              />
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isFocused.email ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isFocused.email ? "#fff" : "#F6F6F6",
                }}
                placeholder="Адрес электронной почты"
                placeholderTextColor="#BDBDBD"
                onFocus={() => {
                  handleInputFocus("email");
                }}
                onBlur={() => {
                  handleInputBlur("email");
                }}
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    marginBottom: 0,
                    borderColor: isFocused.password ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isFocused.password ? "#fff" : "#F6F6F6",
                  }}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={showPassword}
                  onFocus={() => {
                    handleInputFocus("password");
                  }}
                  onBlur={() => {
                    handleInputBlur("password");
                  }}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.btnShowPassword}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.titleShowPassword}>
                    {showPassword ? "Показать" : "Скрыть"}
                  </Text>
                </TouchableOpacity>
              </View>

              {!isShowKeyboard && (
                <>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btn}
                    onPress={onSubmit}
                  >
                    <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("Войти")}
                  >
                    <Text style={styles.btnSecondaryTitle}>
                      Уже есть аккаунт? Войти
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  form: {
    position: "relative",
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
  },
  avatar: {
    position: "absolute",
    textAlign: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
    top: -60,
    left: Dimensions.get("window").width / 2 - 60,
  },
  avatarImage: {
    height: "100%",
    width: "100%",
    borderRadius: 16,
  },
  iconBlock: {
    position: "absolute",
    right: -12,
    bottom: 14,
  },

  title: {
    fontFamily: "R-Medium",
    fontSize: 30,
    marginBottom: 33,
    textAlign: "center",
  },
  input: {
    fontFamily: "R-Regular",
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 16,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    color: "#212121",
  },
  btn: {
    borderRadius: 100,
    height: 51,
    marginBottom: 16,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderColor: "#FF6C00",
  },
  btnTitle: {
    fontFamily: "R-Regular",
    fontSize: 16,
    color: "#ffffff",
  },
  btnShowPassword: {
    position: "absolute",
    right: 16,
    top: 15,
  },
  titleShowPassword: {
    fontFamily: "R-Regular",
    color: "#1B4371",
    fontSize: 16,
  },
  btnSecondaryTitle: {
    fontFamily: "R-Regular",
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
  },
});

export default RegistrationScreen;
