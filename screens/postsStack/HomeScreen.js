import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/auth/auth-selectors";
import { getPosts } from "../../redux/dashboard/dashboard-selectors";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { handlePosts } from "../../redux/dashboard/dashboard-slice";
import {
  addLike,
  deleteLike,
  deletePost,
} from "../../redux/dashboard/dashboard-operations";

const HomeScreen = ({ navigation }) => {
  const posts = useSelector(getPosts);
  const { name, email, avatar, id } = useSelector(getUser);
  const dispatch = useDispatch();

  const getDatabasePosts = () => {
    const postsStorageRef = collection(db, `posts`);
    onSnapshot(postsStorageRef, (data) => {
      if (data.docs.length) {
        const dbPosts = data.docs.map((post) => ({
          ...post.data(),
          id: post.id,
        }));
        dispatch(handlePosts(dbPosts));
      }
    });
  };

  const deleteUserPost = (post) => {
    if (id !== post.postAuthor) return;

    return Alert.alert("Удалить публикацию?", `Публикация: «${post.title}»`, [
      { text: "Нет" },
      {
        text: "Да, подтвердить",
        onPress: () => {
          dispatch(deletePost(post.id));
        },
      },
    ]);
  };

  const handleLike = (post) => {
    if (id === post.postAuthor) return;
    const isLiked = post.likes.includes(id);
    if (isLiked) {
      dispatch(deleteLike(post.id));
    } else {
      dispatch(addLike(post.id));
    }
  };
  useEffect(() => {
    getDatabasePosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userBlock}>
        {avatar ? (
          <Image style={styles.userAvatar} source={{ uri: avatar }} />
        ) : (
          <View
            style={{ ...styles.userAvatar, backgroundColor: "#F6F6F6" }}
          ></View>
        )}

        <View>
          <Text style={styles.userLogin}>{name}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>

      <FlatList
        style={{ marginTop: 34 }}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postBlock}>
            <TouchableOpacity
              style={{ marginBottom: 8 }}
              onLongPress={() => {
                deleteUserPost(item);
              }}
            >
              <Image source={{ uri: item.photo }} style={styles.postImage} />
            </TouchableOpacity>
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
                  <Feather
                    name="message-circle"
                    size={22}
                    color={
                      item.comments.find((el) => el.commentAuthor.id === id)
                        ? "#FF6C00"
                        : "#BDBDBD"
                    }
                    style={styles.icon}
                  />
                  <Text style={styles.counter}>{item.comments.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.btnBlock, marginLeft: 10 }}
                  onPress={() => {
                    handleLike(item);
                  }}
                >
                  <Feather
                    name="thumbs-up"
                    size={21}
                    color={item.likes.includes(id) ? "#FF6C00" : "#BDBDBD"}
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
                  return Alert.alert("", "Пользователь не указал геолокацию", [
                    { text: "OK" },
                  ]);
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
                    ? `${item.placeDescription.region}, ${item.placeDescription.country}`
                    : "не указано"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  userBlock: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    height: 60,
    width: 60,
    marginRight: 8,
    borderRadius: 8,
  },
  userLogin: {
    fontFamily: "R-Bold",
    fontSize: 13,
  },
  userEmail: {
    fontFamily: "R-Regular",
    fontSize: 11,
    color: "#212121CC",
  },
  postBlock: {
    marginBottom: 30,
    width: "100%",
  },
  postImage: {
    height: 240,
    borderRadius: 8,
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
    marginRight: 5,
  },
  btnBlock: {
    flexDirection: "row",
    alignItems: "center",
  },
  counter: {
    color: "#BDBDBD",
    fontFamily: "R-Regular",
    fontSize: 16,
  },
  postPlace: {
    fontFamily: "R-Regular",
    fontSize: 16,
    borderBottomWidth: 1,
  },
});

export default HomeScreen;
