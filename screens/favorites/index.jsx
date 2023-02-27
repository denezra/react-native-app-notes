import { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Context } from "../../context";
import FavoriteItem from "../../components/favoriteItem";

export default function Favorites(params) {
  const { favoriteItems, handleRemoveFavorites } = useContext(Context);

  if (favoriteItems.length === 0) {
    return (
      <View style={styles.noFavorites}>
        <Text style={styles.noFavoritesText}>No Favorite Product Added.</Text>
      </View>
    );
  }
  return (
    <View style={styles.favoriteMainContainer}>
      <FlatList
        data={favoriteItems}
        renderItem={(itemData) => (
          <FavoriteItem
            title={itemData.item.title}
            reason={itemData.item.reason}
            handleRemoveFavorites={handleRemoveFavorites}
            id={itemData.item.id}
          />
        )}
        keyExtractor={(itemData) => itemData.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteMainContainer: {
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  noFavorites: {
    padding: 20,
    alignItems: "center",
  },
  noFavoritesText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
});
