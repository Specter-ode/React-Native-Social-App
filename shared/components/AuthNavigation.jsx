import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RegistrationScreen } from "../../screens/authStack";

const AuthStack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator initialRouteName="Войти">
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name="Войти"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name="Регистрация"
        component={RegistrationScreen}
      />
    </AuthStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
export default AuthNavigation;
