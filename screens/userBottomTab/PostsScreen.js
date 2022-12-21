import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BackArrowHeader } from "../../shared/components/BackArrowHeader";
import { MapScreen, HomeScreen, CommentsScreen } from "../postsStack";
import { LogoutHeader } from "../../shared/components/LogoutHeader";

const PostsStack = createStackNavigator();

const PostsScreen = () => {
  return (
    <PostsStack.Navigator
      initialRouteName="Публикации"
      backBehavior="history"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "R-Medium",
          fontSize: 17,
        },
        headerStyle: {
          borderBottomWidth: 0.5,
          borderBottomColor: "#b3b3b3",
        },
        headerTitleAlign: "center",
      }}
    >
      <PostsStack.Screen
        name="Публикации"
        component={HomeScreen}
        options={() => ({
          headerRight: () => <LogoutHeader />,
        })}
      />
      <PostsStack.Screen
        name="Комментарии"
        component={CommentsScreen}
        options={({ navigation }) => ({
          headerLeft: () => <BackArrowHeader navigation={navigation} />,
        })}
      />
      <PostsStack.Screen
        name="Карта"
        component={MapScreen}
        options={({ navigation }) => ({
          headerLeft: () => <BackArrowHeader navigation={navigation} />,
        })}
      />
    </PostsStack.Navigator>
  );
};

export default PostsScreen;
