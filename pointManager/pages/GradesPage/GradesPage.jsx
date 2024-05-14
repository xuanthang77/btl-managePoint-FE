// GradesPage.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { https } from "../../services/urlConfig"; // Giả sử bạn đã có cấu hình axios
import { pointService } from "../../services/point.service";

const GradesPage = () => {
  const [grades, setGrades] = useState([]);

  const fetchGrades = async () => {
    try {
      const response = await pointService.getGrade();
      setGrades(response?.data?.results);
    } catch (error) {
      console.error("Lỗi khi tải điểm:", error);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const renderGradeItem = ({ item }) => (
    <View style={styles.gradeItem}>
      <Text style={styles.subject}>{item?.subject?.name}</Text>
      <Text style={styles.grade}>Giữa kỳ: {item.midterm_grade}</Text>
      <Text style={styles.grade}>Cuối kỳ: {item.final_grade}</Text>
      <Text style={styles.grade}>Cột 1: {item.other_grade_1}</Text>
      <Text style={styles.grade}>Cột 2: {item.other_grade_2}</Text>
      <Text style={styles.grade}>Cột 3: {item.other_grade_3}</Text>
      <Text style={styles.grade}>Cột 4: {item.other_grade_4}</Text>
      <Text style={styles.grade}>Cột 5: {item.other_grade_5}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Điểm của tôi</Text>
      <Text>Đã khóa điểm: {grades?.is_locked ? "Đã khoá" : "Không"}</Text>

      <FlatList
        data={grades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGradeItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  gradeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  subject: {
    fontSize: 18,
    fontWeight: "bold",
  },
  grade: {
    fontSize: 16,
  },
});

export default GradesPage;
