import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogoutHeader } from "./LogoutHeader";
import { BackArrowHeader } from "./BackArrowHeader";
import {
  PostsScreen,
  CreatePostsScreen,
  ProfileScreen,
} from "../../screens/userBottomTab";

import { Feather, AntDesign } from "@expo/vector-icons";
import { View } from "react-native";

const UserBottomTab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <UserBottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF6C00",
        tabBarShowLabel: false,
        headerTitleAlign: "center",
      }}
    >
      <UserBottomTab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
          headerRight: () => <LogoutHeader />,
        }}
        name="Публикации"
        component={PostsScreen}
      />
      <UserBottomTab.Screen
        options={({ navigation }) => {
          return {
            tabBarIcon: ({ size, color }) => (
              <View
                style={{
                  height: 40,
                  width: 70,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: color,
                }}
              >
                <AntDesign name="plus" size={size} color="#fff" />
              </View>
            ),

            headerLeft: () => <BackArrowHeader navigation={navigation} />,
          };
        }}
        name="Создать публикацию"
        component={CreatePostsScreen}
      />
      <UserBottomTab.Screen
        options={({ navigation }) => {
          return {
            tabBarIcon: ({ size, color }) => (
              <Feather name="user" size={size} color={color} />
            ),
            headerLeft: () => <BackArrowHeader navigation={navigation} />,
          };
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </UserBottomTab.Navigator>
  );
};

export default MainNavigation;
