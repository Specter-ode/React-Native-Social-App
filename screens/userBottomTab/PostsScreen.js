import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BackArrowHeader } from "../../shared/components/BackArrowHeader";
import { MapScreen, HomeScreen, CommentsScreen } from "../postsStack";
const PostsStack = createStackNavigator();
const PostsScreen = () => {
  return (
    <PostsStack.Navigator initialRouteName="Home" backBehavior="history">
      <PostsStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
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
