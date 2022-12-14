import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import RegistrationScreen from "./screens/AuthScreens/RegistrationScreen";
import LoginScreen from "./screens/AuthScreens/LoginScreen";

const loadApp = async () => {
  await Font.loadAsync({
    "R-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "R-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "R-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const [firstRender, setFirstRender] = useState(true);

  if (firstRender) {
    return (
      <AppLoading
        startAsync={loadApp}
        onFinish={() => setFirstRender(false)}
        onError={console.warn}
      />
    );
  }

  return (
    <>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
    </>
  );
}
