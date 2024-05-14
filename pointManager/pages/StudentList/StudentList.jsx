import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const StudentList = () => {
  const students = [
    { id: "1", name: "Nguyen Van A" },
    { id: "2", name: "Le Thi B" },
    // Add more students here
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sinh viên</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.student}>{item.name}</Text>
        )}
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
    marginBottom: 20,
  },
  student: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default StudentList;
