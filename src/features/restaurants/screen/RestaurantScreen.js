import React, { useContext } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, StatusBar } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeArea } from "../../../utils/safe-area-component";
import RestaurantInfoComponent from "../components/RestaurantInfoComponent";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { RestaurantContext } from "../../../services/restaurants/restaurant.context";
const RestaurantScreen = () => {

    const { isLoading, error, restaurants } = useContext(RestaurantContext)
    // console.log("restaurantContext", restaurants)

    return (<SafeArea>
        {
            isLoading && (<View style={{ position: "absolute", top: "50%", left: "50%" }}>
                <ActivityIndicator animating={true} color={MD2Colors.blue400} size={50} style={{ marginLeft: -25 }} />
            </View>)
        }
        <View style={styles.search}>
            <Searchbar elevation={2} />
        </View>
        <View style={styles.list}>
            <FlatList
                data={restaurants}
                renderItem={({ item }) => {
                    // console.log("item",  item);
                    return (<RestaurantInfoComponent restaurant={item} />)
                }
                }
                keyExtractor={(item) => item.name}
                contentContainerStyle={{ padding: 1 }}
            />
        </View>
    </SafeArea>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight,
        backgroundColor: "white",
    },
    search: {
        padding: 10,
    },
    list: {
        flex: 1,
        padding: 10,
        // backgroundColor: "lightgray",
    },
});

export default RestaurantScreen;
