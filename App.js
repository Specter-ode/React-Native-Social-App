import React, { useState, useEffect, useCallback } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { View } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./shared/components/Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "R-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
          "R-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "R-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
        });
        await Asset.fromModule(
          require("./assets/images/background.jpg")
        ).downloadAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={{ height: "100%" }} onLayout={onLayoutRootView}>
          <Main />
        </View>
      </NavigationContainer>
    </Provider>
  );
}
