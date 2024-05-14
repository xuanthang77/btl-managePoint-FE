import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { pointService } from "../../services/point.service";

const ForumCommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [forum, setForum] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const response = await pointService.getForumComments();
      setComments(response?.data?.results);
    } catch (error) {
      console.error("Lỗi khi tải bình luận:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommentPost = async () => {
    try {
      const response = await pointService.getForumPost();
      setForum(response?.data?.results);
    } catch (error) {
      console.error("Lỗi khi tải bài viết:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostComment = async () => {
    if (newComment.trim() === "") {
      Alert.alert("Lỗi", "Nội dung bình luận không được để trống");
      return;
    }

    try {
      const newCommentData = {
        content: newComment,
        author: "1",
        post: "1",
      };

      const response = await pointService.postForumComment(newCommentData);
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Lỗi khi đăng bình luận:", error);
      Alert.alert(
        "Lỗi",
        "Đã có lỗi xảy ra khi đăng bình luận. Vui lòng thử lại sau"
      );
    }
  };

  useEffect(() => {
    fetchComments();
    fetchCommentPost();
  }, []);

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentItem}>
      <Text style={styles.author}>{item.author}</Text>
      <Text style={styles.comment}>{item.content}</Text>
    </View>
  );

  const renderCommentPostItem = ({ item }) => (
    <View style={styles.commentItem}>
      <Text style={styles.author}>{item.title}</Text>
      <Text style={styles.comment}>{item.content}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bình luận trong diễn đàn</Text>
      <FlatList
        data={forum}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCommentPostItem}
      />
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCommentItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập bình luận của bạn"
        value={newComment}
        onChangeText={setNewComment}
      />
      <Button title="Đăng bình luận" onPress={handlePostComment} />
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
    textAlign: "center",
  },
  commentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
  },
  comment: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ForumCommentsPage;
