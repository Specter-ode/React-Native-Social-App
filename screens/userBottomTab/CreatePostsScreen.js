import React, { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
  Image,
  Dimensions,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { auth, storage } from "../../firebase";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Feather, Ionicons } from "@expo/vector-icons";
import { CameraIcon } from "../../shared/svgComponents";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/dashboard/dashboard-operations";

const initialState = {
  photo: null,
  title: null,
  placeDescription: {},
  location: {
    isLocation: false,
  },
};

const initialStateFocus = {
  title: null,
  placeDescription: null,
};

const CreatePostsScreen = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(initialStateFocus);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [openCamera, setOpenCamera] = useState(false);

  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const { photo, title, placeDescription, location } = state;
  const formCompleted = photo && title && placeDescription;

  const dispatch = useDispatch();

  useEffect(() => {
    if (openCamera) {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== "granted") {
          return Alert.alert(
            "Доступ к камере запрещен",
            "Проверьте настройки вашего телефона",
            [{ text: "OK" }]
          );
        }
        await MediaLibrary.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }
  }, [openCamera]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      setOpenCamera(false);
    });
  }, [navigation]);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setState((prevState) => ({
      ...prevState,
      photo: photo.uri,
    }));
    setOpenCamera(false);
    await MediaLibrary.createAssetAsync(photo.uri);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return Alert.alert(
        "Доступ к геолокации запрещен",
        "Проверьте настройки вашего телефона",
        [{ text: "OK" }]
      );
    }
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low,
    });
    const exactLocation = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });

    setState((prevState) => ({
      ...prevState,
      placeDescription: {
        country: exactLocation[0].country,
        region: exactLocation[0].region,
      },
      location: {
        isLocation: true,
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      },
    }));
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
    setOpenCamera(false);
  };
  const handleInputBlur = (inputName) => {
    setIsFocused({
      ...isFocused,
      [inputName]: false,
    });
  };

  const clearFields = () => {
    setOpenCamera(false);
    setState(initialState);
  };

  const publishPost = () => {
    if (!photo) {
      return Alert.alert(
        "Вы не сделали фото!",
        "Публикация без фото невозможна",
        [{ text: "OK" }]
      );
    }
    if (!title) {
      return Alert.alert(
        "Вы не заполнили описание фото!",
        "Публикация без названия невозможна",
        [{ text: "OK" }]
      );
    }
    dispatch(createPost(state));
    navigation.navigate("Публикации");
    clearFields();
  };

  const deletePhoto = () => {
    setOpenCamera(false);
    setState((prevState) => ({ ...prevState, photo: null }));
  };

  const getImageFromLibrary = async () => {
    let file = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });

    if (!file.canceled) {
      setState((prevState) => ({ ...prevState, photo: file.assets[0].uri }));
    }
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

  const WINDOW_HEIGHT = Dimensions.get("window").height;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View
          style={{
            ...styles.container,
            paddingVertical: WINDOW_HEIGHT > 700 ? 32 : 22,
          }}
        >
          <View style={styles.form}>
            {!isShowKeyboard && (
              <View style={styles.cameraBlock}>
                {openCamera ? (
                  <>
                    {hasPermission ? (
                      <>
                        <Camera
                          style={styles.camera}
                          ref={setCamera}
                          type={type}
                          flashMode="auto"
                          onMountError={(error) => {
                            console.log("camera error", error);
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              ...styles.cameraIconBlock,
                              backgroundColor: "#FFFFFF4D",
                            }}
                            onPress={takePhoto}
                          >
                            <CameraIcon fill="#fff" />
                          </TouchableOpacity>
                        </Camera>
                      </>
                    ) : hasPermission === null ? (
                      <Text>Ожиданием включения камеры</Text>
                    ) : (
                      <Text>Разрешение для доступа к камере отсутствует</Text>
                    )}
                  </>
                ) : (
                  <>
                    {photo && (
                      <Image
                        source={{ uri: photo }}
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: 8,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      style={{
                        ...styles.cameraIconBlock,
                        backgroundColor: photo ? "#FFFFFF4D" : "#fff",
                      }}
                      onPress={() => {
                        setOpenCamera(true);
                      }}
                    >
                      <CameraIcon fill={photo ? "#fff" : "#BDBDBD"} />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            )}

            {hasPermission && openCamera ? (
              <View
                style={{
                  ...styles.bottomCameraBlock,
                  marginBottom: WINDOW_HEIGHT > 700 ? 48 : 28,
                }}
              >
                <TouchableOpacity
                  style={styles.btnChangeCamera}
                  onPress={deletePhoto}
                >
                  <Text style={styles.btnTitle}>Выключить</Text>
                  <Feather
                    name="camera-off"
                    size={20}
                    color="#BDBDBD"
                    style={{ marginLeft: 9 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnChangeCamera}
                  onPress={toggleCameraType}
                >
                  <Text style={styles.btnTitle}>Перевернуть</Text>
                  <Ionicons
                    name="camera-reverse-outline"
                    size={24}
                    color="#BDBDBD"
                    style={{ marginLeft: 9 }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  ...styles.loadBtn,
                  marginBottom: WINDOW_HEIGHT > 700 ? 48 : 28,
                }}
                onPress={photo ? deletePhoto : getImageFromLibrary}
              >
                <Text style={{ ...styles.btnTitle, color: "#BDBDBD" }}>
                  {photo ? "Удалить фото" : "Загрузить фото"}
                </Text>
              </TouchableOpacity>
            )}

            <View>
              <TextInput
                style={{
                  ...styles.input,
                  fontFamily: title ? "R-Medium" : "R-Regular",
                  borderColor: isFocused.title ? "#FF6C00" : "#E8E8E8",
                  marginBottom: WINDOW_HEIGHT > 700 ? 32 : 22,
                }}
                placeholder="Название..."
                placeholderTextColor="#BDBDBD"
                onFocus={() => {
                  handleInputFocus("title");
                }}
                onBlur={() => {
                  handleInputBlur("title");
                }}
                value={title}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, title: value }))
                }
              />
              <TouchableOpacity
                style={{
                  ...styles.placeInputBlock,
                  marginBottom: WINDOW_HEIGHT > 700 ? 48 : 22,
                  borderColor: isFocused.placeDescription
                    ? "#FF6C00"
                    : "#E8E8E8",
                }}
                onPress={getLocation}
              >
                <Feather
                  name="map-pin"
                  size={24}
                  color={isFocused.placeDescription ? "#FF6C00" : "#BDBDBD"}
                  style={styles.placeIcon}
                />
                <Text
                  style={{
                    ...styles.placeTitle,
                    paddingLeft: 32,
                    fontFamily: "R-Regular",
                    color: location.isLocation ? "#212121" : "#BDBDBD",
                  }}
                >
                  {location.isLocation
                    ? `${placeDescription.region}, ${placeDescription.country}`
                    : "Местность..."}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  ...styles.btn,
                  backgroundColor: formCompleted ? "#FF6C00" : "#F6F6F6",
                }}
                onPress={publishPost}
              >
                <Text
                  style={{
                    ...styles.btnPublish,
                    color: formCompleted ? "#FFF" : "#BDBDBD",
                  }}
                >
                  Опубликовать
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.blockBtnDelete}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                ...styles.btnDelete,
                backgroundColor: "#F6F6F6",
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  cameraBlock: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d4cfcf",
    marginBottom: 8,
    height: 240,
  },
  cameraIconBlock: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: 60,
    width: 60,
    borderRadius: 60,
  },

  camera: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  takePhotoContainer: {
    borderRadius: 8,
  },
  bottomCameraBlock: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loadBtn: {
    marginTop: 8,
  },
  input: {
    position: "relative",
    borderBottomWidth: 1,
    paddingBottom: 15,
    width: "100%",
    color: "#212121",
    fontSize: 16,
  },
  placeInputBlock: {
    position: "relative",
    borderBottomWidth: 1,
    paddingBottom: 15,
    width: "100%",
  },

  placeIcon: {
    position: "absolute",
  },
  placeTitle: {
    fontFamily: "R-Regular",
    fontSize: 16,
  },
  btn: {
    borderRadius: 100,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
  },
  btnChangeCamera: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnTitle: {
    fontFamily: "R-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  btnPublish: {
    fontFamily: "R-Regular",
    fontSize: 16,
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
