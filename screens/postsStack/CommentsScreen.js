import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  addComment,
  deleteComment,
} from "../../redux/dashboard/dashboard-operations";
import { TextInput } from "react-native-gesture-handler";
import { getUser } from "../../redux/auth/auth-selectors";
import { dateParser } from "../../shared/helpers/dateParser";
import { nanoid } from "@reduxjs/toolkit";

const CommentsScreen = ({ route }) => {
  const { photo, postId } = route.params;
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const user = useSelector(getUser);
  const [currentPostComments, setCurrentPostComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();

  const getDatabaseComments = () => {
    const postsStorageRef = collection(db, `posts`);
    onSnapshot(postsStorageRef, (data) => {
      if (data.docs.length) {
        const dbPosts = data.docs.map((post) => ({
          ...post.data(),
          id: post.id,
        }));
        dbPosts.forEach((el) => {
          if (el.id === postId) {
            setCurrentPostComments(el.comments);
            return;
          }
        });
      }
    });
  };

  useEffect(() => {
    getDatabaseComments();
  }, []);

  const handleSubmit = () => {
    if (!comment) {
      return Alert.alert(
        "Поле для комментариев пустое",
        "Заполните для отправки",
        [{ text: "OK" }]
      );
    }
    const newCommentData = {
      postId,
      title: comment,
      id: nanoid(),
      commentAuthor: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        avatar: auth.currentUser.photoURL,
      },
      creationDate: new Date().getTime(),
    };

    dispatch(addComment(newCommentData));
    setCurrentPostComments((prevState) => [...prevState, newCommentData]);
    setComment("");
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const deleteUserComment = (comment) => {
    if (user.id !== comment.commentAuthor.id) return;
    return Alert.alert("Удалить комментарий?", `Текст: «${comment.title}»`, [
      { text: "Нет" },
      {
        text: "Да, подтвердить",
        onPress: () => {
          dispatch(deleteComment({ postId, comment }));
        },
      },
    ]);
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
          <View
            style={{
              ...styles.postImageBlock,
              marginBottom: isShowKeyboard ? 15 : 30,
            }}
          >
            <Image source={{ uri: photo }} style={styles.postImage} />
          </View>
          {!isShowKeyboard && (
            <FlatList
              style={styles.list}
              data={currentPostComments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={{
                    ...styles.commentBlock,
                    flexDirection:
                      item.commentAuthor.id === user.id ? "row-reverse" : "row",
                  }}
                >
                  {item.commentAuthor.avatar ? (
                    <Image
                      source={{ uri: item.commentAuthor.avatar }}
                      style={{
                        ...styles.authorImage,

                        marginLeft: item.commentAuthor.id === user.id ? 16 : 0,
                        marginRight: item.commentAuthor.id === user.id ? 0 : 16,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        ...styles.authorImageBlock,
                        marginLeft: item.commentAuthor.id === user.id ? 16 : 0,
                        marginRight: item.commentAuthor.id === user.id ? 0 : 16,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="account-off"
                        size={24}
                        color="#808080"
                        style={styles.icon}
                      />
                    </View>
                  )}
                  <TouchableOpacity
                    style={{
                      ...styles.textBlock,
                      borderTopLeftRadius:
                        item.commentAuthor.id === user.id ? 16 : 0,
                      borderTopRightRadius:
                        item.commentAuthor.id === user.id ? 0 : 16,
                    }}
                    onLongPress={() => {
                      deleteUserComment(item);
                    }}
                  >
                    <Text style={styles.commentTitle}>{item.title}</Text>
                    <Text style={styles.date}>
                      {dateParser(item.creationDate, "fullDate")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
          <View
            style={{ ...styles.inputBlock, marginTop: isShowKeyboard ? 0 : 30 }}
          >
            <TextInput
              style={{
                ...styles.input,
                borderColor: isFocused ? "#FF6C00" : "#E8E8E8",
                backgroundColor: isFocused ? "#fff" : "#F6F6F6",
              }}
              placeholder="Комментировать"
              placeholderTextColor="#BDBDBD"
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => {
                setIsFocused(false);
              }}
              value={comment}
              onChangeText={(value) => {
                setComment(value);
              }}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btn}
              onPress={handleSubmit}
            >
              <AntDesign
                name="arrowup"
                size={20}
                color="#FFF"
                style={styles.icon}
              />
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
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 30,
  },
  postImageBlock: {
    width: "100%",
  },

  postImage: {
    height: 240,
    borderRadius: 8,
  },
  list: {
    minHeight: 100,
    maxHeight: 500,
    marginBottom: 0,
  },
  commentBlock: {
    marginBottom: 24,
    width: "100%",
  },

  authorImageBlock: {
    height: 28,
    width: 28,
    borderRadius: 18,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  authorImage: {
    height: 28,
    width: 28,
    borderRadius: 18,
    marginRight: 16,
  },
  textBlock: {
    width: Dimensions.get("window").width - 76,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  commentTitle: {
    fontFamily: "R-Regular",
    fontSize: 13,
    color: "#212121",
    marginBottom: 8,
  },
  date: {
    fontFamily: "R-Regular",
    fontSize: 10,
    color: "#BDBDBD",
  },
  inputBlock: {
    marginTop: 30,
    position: "relative",
  },
  input: {
    fontFamily: "R-Medium",
    fontSize: 16,
    borderWidth: 1,
    height: 50,
    borderRadius: 50,
    paddingLeft: 16,
    paddingRight: 50,
    color: "#212121",
  },
  btn: {
    position: "absolute",
    right: 8,
    bottom: 8,
    width: 34,
    height: 34,
    borderRadius: 20,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;
