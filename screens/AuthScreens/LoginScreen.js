import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};
const initialStateFocus = {
  email: false,
  password: false,
};
export const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isFocused, setIsFocused] = useState(initialStateFocus);

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
    console.log("state: ", state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/background.jpg")}
        >
          <StatusBar style="auto" />
          {/* <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ width: "100%" }}
          > */}
          <View style={styles.formBlock}>
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 132,
              }}
            >
              <Text style={styles.title}>Войти</Text>
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
                    <Text style={styles.btnTitle}>Войти</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btnSecondary}
                  >
                    <Text style={styles.btnSecondaryTitle}>
                      Нет аккаунта? Зарегистрироваться
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          {/* </KeyboardAvoidingView> */}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 32,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
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
  btnSecondary: {},

  btnSecondaryTitle: {
    fontFamily: "R-Regular",
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
  },
});

export default LoginScreen;
