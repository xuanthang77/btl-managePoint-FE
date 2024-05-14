import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserNav = ({ isLoggedIn, userData }) => {
  const navigation = useNavigation();
  console.log("isLoggedIn", isLoggedIn);
  console.log("userData", userData);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("user_data");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoggedIn && userData ? (
        <View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoText}>
              Xin chào, {userData.username}!
            </Text>
            {userData.role === 2 && (
              <View style={styles.buttonsContainer}>
                <Button
                  title="Tìm kiếm sinh viên"
                  buttonStyle={styles.searchButton}
                  onPress={() => navigation.navigate("StudentSearch")}
                />
              </View>
            )}
          </View>

          {userData.role === 3 && (
            <Button
              title="Xem điểm"
              buttonStyle={styles.gradesButton}
              onPress={() => navigation.navigate("Grades")}
            />
          )}
          <Button
            title="Diễn đàn"
            buttonStyle={styles.gradesButton}
            onPress={() => navigation.navigate("ForumComments")}
          />
          <Button
            title="Đăng xuất"
            buttonStyle={styles.logoutButton}
            onPress={handleLogout}
          />
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <Button
            title="Đăng nhập"
            buttonStyle={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          />
          <Button
            title="Đăng ký"
            buttonStyle={styles.registerButton}
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10, // Khoảng cách giữa userInfoContainer và nút Đăng xuất
  },
  userInfoText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  loginButton: {
    width: 120,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },
  registerButton: {
    width: 120,
    borderRadius: 5,
    backgroundColor: "#28a745",
  },
  searchButton: {
    width: 180,
    borderRadius: 5,
    backgroundColor: "#17a2b8",
    marginLeft: 10,
  },
  logoutButton: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#dc3545",
    marginTop: 10,
  },
});

export default UserNav;
