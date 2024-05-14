import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import { store } from "./store";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GradesPage from "./pages/GradesPage/GradesPage";
import ForumCommentsPage from "./pages/ForumComment/ForumCommentPage";

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem("access_token");
      if (userToken) {
        setIsLoggedIn(true);
        const userData = await AsyncStorage.getItem("user_data");
        if (userData) {
          setUserData(JSON.parse(userData));
        }
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái đăng nhập:", error);
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home">
            {(props) => (
              <HomePage
                {...props}
                isLoggedIn={isLoggedIn}
                userData={userData}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="Grades" component={GradesPage} />
          <Stack.Screen name="ForumComments" component={ForumCommentsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
