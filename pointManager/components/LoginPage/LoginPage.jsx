import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { userServ } from "../../services/user.service";
import { useNavigation } from "@react-navigation/native";
import { https } from "../../services/urlConfig";
import { setUser } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await https.post("/o/token/", {
        grant_type: "password",
        username: name,
        password: password,
        client_id: "KfV4nBkx53QBwcNTFrMHWnZUe0VV3BdPEvgvQBYS",
        client_secret:
          "FxVmdbY8G4Rs1xbE3ovhxtd4hGQavckBLC8xEJyOu7CbRU8uBSd3x1SDx19eNe5pZoxwiRNKWfViHRLrcBqFAYzcG55MGi44JCeHyj4F9XFtOut0yBHnd6Pv3RzTHAVP",
      });
      https.defaults.headers["Authorization"] =
        "Bearer " + response.data.access_token;
      const { access_token } = response.data;
      await AsyncStorage.setItem("access_token", access_token);
      const userResponse = await https.get("/point/api/users/current-user/");
      if (userResponse.data) {
        await AsyncStorage.setItem(
          "user_data",
          JSON.stringify(userResponse.data)
        );

        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <Input
        placeholder="Tên người dùng"
        value={name}
        onChangeText={(text) => setName(text)}
        leftIcon={<Icon name="person" />}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Mật khẩu"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        leftIcon={<Icon name="lock" />}
        inputStyle={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        title="Đăng nhập"
        buttonStyle={styles.button}
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: "80%",
    backgroundColor: "blue",
    marginLeft: 30,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginPage;
