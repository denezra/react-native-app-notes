import {
  ActivityIndicator,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import ProductDetailsItem from "../../components/productDetailsItem";
import { Context } from "../../context";

export default function ProductDetails() {
  const { addToFavorites, favoriteItems } = useContext(Context);

  const navigation = useNavigation();

  const route = useRoute();
  const productId = route.params.prodId;

  const [loading, setLoading] = useState(false);
  const [productDetailsData, setProductDetailsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState("");
  const [
    isCurrentItemSelectedInFavoritesItemsArray,
    setIsCurrentItemSelectedInFavoritesItemsArray,
  ] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const getDataFromApi = async () => {
        const res = await fetch(`https://dummyjson.com/products/${productId}`, {
          signal,
        });
        const data = await res.json();

        if (data) {
          setLoading(false);
          setProductDetailsData(data);
        }
      };

      getDataFromApi();
    } catch (error) {
      setLoading(false);
      console.log(`Error getting the product detail ${error}`);
    }

    navigation.setOptions({
      headerRight: (props) => (
        <Button
          onPress={() => setModalVisible(!modalVisible)}
          title={
            isCurrentItemSelectedInFavoritesItemsArray.length > 0
              ? "Update Favorite"
              : "Add Favorites"
          }
        />
      ),
    });

    setIsCurrentItemSelectedInFavoritesItemsArray(() =>
      favoriteItems && favoriteItems.length > 0
        ? favoriteItems.filter((item) => item.id === productId)
        : false
    );

    return () => {
      setLoading(false);
      controller.abort();
    };
  }, []);

  console.log(
    "isCurrentItemSelectedInFavoritesItemsArray ",
    isCurrentItemSelectedInFavoritesItemsArray
  );

  const handleOnChange = (enteredText) => {
    setReason(enteredText);
  };

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} color={"red"} size={"large"} />
    );
  }

  return (
    <View>
      <ProductDetailsItem productDetailsData={productDetailsData} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Why you like this product?"
              onChangeText={handleOnChange}
              value={reason}
              style={styles.reasonTextInput}
            />
            <View style={styles.buttonWrapper}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                  addToFavorites(productId, reason);
                  setIsCurrentItemSelectedInFavoritesItemsArray(true);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>
                  {isCurrentItemSelectedInFavoritesItemsArray.length > 0
                    ? "Update"
                    : "Add"}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 1,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonWrapper: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 1,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
    marginRight: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginLeft: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  reasonTextInput: {
    borderWidth: 1,
    padding: 10,
  },
});
