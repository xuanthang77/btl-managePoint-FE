import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { userServ } from "../../services/user.service";
import { useNavigation } from "@react-navigation/native";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const navigation = useNavigation();

  const data = [
    { label: "admin", value: "1" },
    { label: "Giảng viên", value: "2" },
    { label: "Học sinh", value: "3" },
  ];
  console.log("avatar", avatar);
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Chọn quyền
        </Text>
      );
    }
    return null;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const registerUser = async () => {
    try {
      const dataRegister = {
        username: name,
        email: email,
        password: password,
        role: value,
        if(avatar) {
          dataRegister.avatar = avatar;
        },
      };
      const response = await userServ.postRegister(dataRegister);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error:", error);
      // Xử lý lỗi ở đây
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      <Input
        placeholder="Họ và tên"
        value={name}
        onChangeText={(text) => setName(text)}
        leftIcon={<Icon name="person" />}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        leftIcon={<Icon name="email" />}
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
      <Input
        placeholder="Nhập lại mật khẩu"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
        leftIcon={<Icon name="lock" />}
        inputStyle={styles.input}
      />
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Chọn quyền" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name="Safety"
            size={20}
          />
        )}
      />
      <Button
        title="Chọn ảnh đại diện"
        buttonStyle={[styles.button, { backgroundColor: "green" }]}
        onPress={pickImage}
      />
      <Button
        title="Đăng ký"
        buttonStyle={[styles.button, { backgroundColor: "blue" }]}
        onPress={registerUser}
      />
      {avatar && (
        <Image
          source={{ uri: avatar }}
          style={[
            styles.image,
            { justifyContent: "center", alignItems: "center" },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: "80%",
    marginTop: 10,
    marginLeft: 40,
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },

  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginLeft: 90,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default RegisterPage;
