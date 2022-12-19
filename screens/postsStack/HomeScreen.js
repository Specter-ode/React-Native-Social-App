import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userBlock}>
        <Image
          style={styles.userAvatar}
          source={require("../../assets/images/avatar.jpg")}
        />
        <View>
          <Text style={styles.userLogin}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#b3b3b3",
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
});

export default HomeScreen;
