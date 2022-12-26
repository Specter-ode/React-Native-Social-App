import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { auth, storage } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { AvatarBoxIcon } from "../../shared/svgComponents";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/auth/auth-selectors";
import { getPosts } from "../../redux/dashboard/dashboard-selectors";
import { handleLogout, changeAvatar } from "../../redux/auth/auth-operations";
import { CommentIcon } from "../../shared/svgComponents";
const ProfileScreen = ({ navigation }) => {
  const [currentUserPosts, setCurrentUserPosts] = useState([]);
  const dispatch = useDispatch();

  const posts = useSelector(getPosts);
  const { name, avatar, id } = useSelector(getUser);

  const onLogout = () => {
    dispatch(handleLogout());
  };
  const getCurrentUserPosts = (allPosts, userId) => {
    const userPosts = allPosts
      .filter((el) => userId === el.postAuthor)
      .sort((a, b) => b.creationDate - a.creationDate);
    setCurrentUserPosts(userPosts);
  };

  useEffect(() => {
    getCurrentUserPosts(posts, id);
  }, [posts]);

  const getImageFromLibrary = async () => {
    if (avatar) {
      dispatch(changeAvatar(null));
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });

    if (!result.canceled) {
      const avatarStorageRef = ref(storage, `avatars/${id}`);
      const responseAvatar = await fetch(result.assets[0].uri);
      const photoFile = await responseAvatar.blob();
      await uploadBytes(avatarStorageRef, photoFile);
      const avatarURL = await getDownloadURL(avatarStorageRef);
      await updateProfile(auth.currentUser, {
        photoURL: avatarURL,
      });
      dispatch(changeAvatar(avatarURL));
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/background.jpg")}
      >
        <StatusBar style="auto" />
        <View
          style={{
            ...styles.list,
            paddingBottom: 32,
          }}
        >
          <TouchableOpacity style={styles.logout} onPress={onLogout}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>

          <View style={styles.avatar}>
            {avatar ? (
              <>
                <Image style={styles.avatarImage} source={{ uri: avatar }} />
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
          <Text style={styles.title}>{name}</Text>
          <FlatList
            data={currentUserPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.postBlock}>
                <Image source={{ uri: item.photo }} style={styles.postImage} />
                <Text style={styles.postTitle}>{item.title}</Text>
                <View style={styles.postPlaceContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={styles.btnBlock}
                      onPress={() =>
                        navigation.navigate("Комментарии", {
                          postId: item.id,
                          photo: item.photo,
                        })
                      }
                    >
                      <CommentIcon fill="#FF6C00" style={styles.icon} />
                      <Text style={styles.counter}>{item.comments.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ ...styles.btnBlock, marginLeft: 20 }}
                      onPress={() => {}}
                    >
                      <Feather
                        name="thumbs-up"
                        size={22}
                        color="#FF6C00"
                        style={styles.icon}
                      />
                      <Text style={styles.counter}>{item.likes.length}</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.btnBlock}
                    onPress={() => {
                      if (item.location.isLocation) {
                        return navigation.navigate("Карта", {
                          location: item.location,
                          title: item.title,
                        });
                      }
                      return Alert.alert(
                        "",
                        "Пользователь не указал геолокацию",
                        [{ text: "OK" }]
                      );
                    }}
                  >
                    <Feather
                      name="map-pin"
                      size={20}
                      color="#BDBDBD"
                      style={styles.icon}
                    />
                    <Text
                      style={{
                        ...styles.postPlace,
                        color: item.location.isLocation ? "#212121" : "#BDBDBD",
                        borderColor: item.location.isLocation
                          ? "#212121"
                          : "#BDBDBD",
                      }}
                    >
                      {item.location.isLocation
                        ? item.placeDescription.country
                        : "не указано"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
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
  },

  list: {
    flexGrow: 1,
    position: "relative",
    width: "100%",
    marginTop: 145,
    paddingHorizontal: 16,
    paddingTop: 90,
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
  logout: {
    position: "absolute",
    right: 16,
    top: 23.5,
  },
  iconBlock: {
    position: "absolute",
    right: -12,
    bottom: 14,
  },

  title: {
    fontFamily: "R-Medium",
    fontSize: 30,
    marginBottom: 30,
    textAlign: "center",
  },
  postBlock: {
    marginBottom: 30,
    width: "100%",
  },
  postImage: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  postTitle: {
    fontFamily: "R-Medium",
    fontSize: 16,
    color: "#212121",
    marginBottom: 8,
  },
  postPlaceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 9,
  },
  btnBlock: {
    flexDirection: "row",
    alignItems: "center",
  },
  counter: {
    fontFamily: "R-Regular",
    color: "#212121",
    fontSize: 16,
  },
  postPlace: {
    fontFamily: "R-Regular",
    fontSize: 16,
    borderBottomWidth: 1,
  },
});

export default ProfileScreen;
