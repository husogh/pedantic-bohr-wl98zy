import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Image, StyleSheet } from "react-native";

const ProfileCard = ({ profile }) => (
  <View style={styles.profileCard}>
    <Image style={styles.profileImage} source={{ uri: profile.imageUrl }} />
    <Text>{profile.name}</Text>
  </View>
);

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchProfiles = async (pageNumber) => {
    setLoading(true);
    // Simulate fetching data from an API
    const newProfiles = await new Promise((resolve) => {
      setTimeout(() => {
        const data = Array.from({ length: 5 }, (_, i) => ({
          id: `profile-${(pageNumber - 1) * 5 + i}`,
          name: `User ${(pageNumber - 1) * 5 + i}`,
          imageUrl: "https://via.placeholder.com/50",
        }));
        resolve(data);
      }, 1000);
    });
    setProfiles((prevProfiles) => [...prevProfiles, ...newProfiles]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        renderItem={({ item }) => <ProfileCard profile={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  profileCard: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 40,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default App;
