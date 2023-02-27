import { StyleSheet, Text, View } from "react-native";

export default function ProductDetailsItem({productDetailsData}) {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>{productDetailsData.title}</Text>
            <Text style={styles.textStyle}>{productDetailsData.description}</Text>
            <Text style={styles.textStyle}>{productDetailsData.price}</Text>
            <Text style={styles.textStyle}>{productDetailsData.rating}</Text>
            <Text style={styles.textStyle}>{productDetailsData.category}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingHorizontal : 15,
        borderWidth: 1,
        margin: 10,
        borderColor: '#88da9e'
    },
    textStyle : {
        color: '#ffffff',
        fontSize: 20,
        paddingBottom: 12
    }
})