import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { pointService } from "../../services/point.service";
import { Picker } from "@react-native-picker/picker";
const GradeInput = () => {
  const [grades, setGrades] = useState([
    { midTerm: "", finalTerm: "", other: [] },
  ]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const addGradeColumn = () => {
    if (grades[0].other.length < 5) {
      setGrades(
        grades.map((grade) => ({ ...grade, other: [...grade.other, ""] }))
      );
    }
  };
  console.log("grades", grades);
  const fetchSubjects = async () => {
    try {
      const response = await pointService.getSubjects();
      setSubjects(response?.data?.results);
    } catch (error) {
      console.error("Lỗi khi tải danh sách môn học:", error);
    }
  };
  const handleSave = async () => {
    try {
      //   const transformedGrades = grades.map((grade) => ({
      //     student: 3,
      //     subject: selectedSubject,
      //     midterm_grade: grade.midTerm,
      //     final_grade: grade.finalTerm,
      //     other_grade_1: grade.other[0] || null,
      //     other_grade_2: grade.other[1] || null,
      //     other_grade_3: grade.other[2] || null,
      //     other_grade_4: grade.other[3] || null,
      //     other_grade_5: grade.other[4] || null,
      //     is_locked: true,
      //   }));
      const data = {
        student: "3",
        subject: "3",
        midterm_grade: "6",
        final_grade: "8",
        //     other_grade_1: grade.other[0] || null,
        //     other_grade_2: grade.other[1] || null,
        //     other_grade_3: grade.other[2] || null,
        //     other_grade_4: grade.other[3] || null,
        //     other_grade_5: grade.other[4] || null,
        is_locked: true,
      };
      //   console.log("transformedGrades", transformedGrades);
      await pointService.postGrade(data);
      Alert.alert("Thông báo", "Lưu điểm thành công");
    } catch (error) {
      console.error("Lỗi khi lưu điểm:", error);
      Alert.alert("Lỗi", "Đã có lỗi xảy ra khi lưu điểm. Vui lòng thử lại sau");
    }
  };

  const handleLockGrades = () => {
    // Implement lock grades functionality
  };
  useEffect(() => {
    // fetchStudents();
    fetchSubjects();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nhập điểm</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Chọn môn học:</Text>
        <Picker
          selectedValue={selectedSubject}
          onValueChange={(itemValue) => setSelectedSubject(itemValue)}
          style={styles.picker}
        >
          {subjects.map((subject) => (
            <Picker.Item
              key={subject.id}
              label={subject.name}
              value={subject.id}
            />
          ))}
        </Picker>
      </View>
      {grades.map((grade, index) => (
        <View key={index} style={styles.gradeRow}>
          <TextInput
            placeholder="Điểm giữa kỳ"
            style={styles.input}
            value={grade.midTerm}
            onChangeText={(text) => {
              const newGrades = [...grades];
              newGrades[index].midTerm = text;
              setGrades(newGrades);
            }}
          />
          <TextInput
            placeholder="Điểm cuối kỳ"
            style={styles.input}
            value={grade.finalTerm}
            onChangeText={(text) => {
              const newGrades = [...grades];
              newGrades[index].finalTerm = text;
              setGrades(newGrades);
            }}
          />
          {grade.other.map((score, idx) => (
            <TextInput
              key={idx}
              placeholder={`Điểm khác ${idx + 1}`}
              style={styles.input}
              value={score}
              onChangeText={(text) => {
                const newGrades = [...grades];
                newGrades[index].other[idx] = text;
                setGrades(newGrades);
              }}
            />
          ))}
        </View>
      ))}
      <Button title="Thêm cột điểm khác" onPress={addGradeColumn} />
      <Button title="Lưu" onPress={handleSave} />
      <Button title="Khóa điểm" onPress={handleLockGrades} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  gradeRow: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});

export default GradeInput;
