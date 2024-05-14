import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
} from "react-native";

const StudentSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Implement search functionality
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm sinh viên</Text>
      <TextInput
        placeholder="Nhập mã số sinh viên hoặc họ tên"
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Tìm kiếm" onPress={handleSearch} />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.student}>{item.name}</Text>
        )}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  list: {
    marginTop: 20,
  },
  student: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 18,
    color: "#333",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
  },
});

export default StudentSearch;
