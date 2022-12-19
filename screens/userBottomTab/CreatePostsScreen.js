// import { AntDesign } from "@expo/vector-icons";
// <AntDesign name="arrowleft" size={24} color="black" />;
// <AntDesign name="camerao" size={24} color="black" />;
// <AntDesign name="appstore-o" size={24} color="black" />;

// <Feather name="log-in" size={24} color="black" />;
// <Feather name="trash-2" size={24} color="black" />;

import { Camera } from "expo-camera";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
const initialState = {
  photo: null,
  name: null,
  place: null,
};

const initialStateFocus = {
  photo: null,
  name: null,
  place: null,
};

const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isFocused, setIsFocused] = useState(initialStateFocus);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const formCompleted = state.photo && state.name && state.place;

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
    navigation.navigate("Публикации");
  };
  const clearFields = () => {
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.form}>
          {!isShowKeyboard && <Camera style={styles.camera}></Camera>}
          <TouchableOpacity style={styles.loadBtn}>
            <Text style={styles.btnTitle}>
              {state.photo ? "Редактировать фото" : "Загрузить фото"}
            </Text>
          </TouchableOpacity>
          <View>
            <TextInput
              style={{
                ...styles.input,
                fontFamily: state.name ? "R-Medium" : "R-Regular",
                borderColor: isFocused.name ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder="Название..."
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

            <TouchableOpacity
              style={{
                ...styles.input,
                fontFamily: "R-Regular",
                borderColor: isFocused.place ? "#FF6C00" : "#E8E8E8",
              }}
              // onPress={() => navigation.navigate("Карта")}
            >
              <Text>
                <Feather name="map-pin" size={24} color="#BDBDBD" />
              </Text>
              <Text style={{ ...styles.btnTitle, marginLeft: 8 }}>
                Местность...
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                ...styles.btn,
                backgroundColor: formCompleted ? "#FF6C00" : "#F6F6F6",
              }}
              onPress={onSubmit}
            >
              <Text style={styles.btnTitle}>Опубликовать</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.blockBtnDelete}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              ...styles.btnDelete,
              backgroundColor: formCompleted ? "#FF6C00" : "#F6F6F6",
            }}
            onPress={clearFields}
          >
            <Text>
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#b3b3b3",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  camera: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    color: "red",
    backgroundColor: "#E8E8E8",
    borderRadius: 40,
  },
  loadBtn: {
    marginBottom: 48,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    marginBottom: 32,
    paddingBottom: 15,
    color: "#212121",
    flexDirection: "row",
  },
  btn: {
    borderRadius: 100,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontFamily: "R-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  blockBtnDelete: {
    marginTop: "auto",
    alignItems: "center",
  },
  btnDelete: {
    height: 40,
    width: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePostsScreen;
