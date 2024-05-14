// HomePage.js
import React from "react";
import { View } from "react-native";

import Footer from "../../components/Footer/Footer";
import UserNav from "../../components/Header/UserNav";
import Header from "../../components/Header/Header";
import GradeInput from "../GradeInput/GradeInput";
import StudentList from "../StudentList/StudentList";
const HomePage = ({ isLoggedIn, userData }) => {
  return (
    <View>
      <Header />
      <UserNav isLoggedIn={isLoggedIn} userData={userData} />
      {userData?.role === 1 || (userData?.role === 2 && <GradeInput />)}
      <Footer />
      <StudentList />
    </View>
  );
};

export default HomePage;
