import { useContext } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { Context } from "../../context";
import { createRandomColor } from "../../helpers";
import ProductListItem from "../../components/productListItem";
import { useNavigation } from "@react-navigation/native";

export default function ProductListing(params) {
    const {products, loading} = useContext(Context)

    const navigation = useNavigation();

    const handleOnPress = (productId) => {
        navigation.navigate("productDetails",{prodId: productId})
    }

    if(loading) {
        return (
            <ActivityIndicator style={styles.loader} color={'red'} size={"large"}/>
        )
    }
    return (
        <View>
            <FlatList 
                data={products}
                renderItem={(itemData) => <ProductListItem 
                    title={itemData.item.title} 
                    onPress={() => handleOnPress(itemData.item.id)} 
                    bgColor={createRandomColor()}/>}
                keyExtractor={(itemData) => itemData.id}
                numColumns={2}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }
})