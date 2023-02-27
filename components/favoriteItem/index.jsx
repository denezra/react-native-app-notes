import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FavoriteItem({
  title,
  reason,
  handleRemoveFavorites,
  id,
}) {
  return (
    <View style={styles.favoriteItemContainer}>
      <Pressable onPress={() => handleRemoveFavorites(id)}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{reason}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteItemContainer: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#0f0782",
    marginBottom: 10,
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});
