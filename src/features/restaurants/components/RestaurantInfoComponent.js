import React from "react";
import { Text, View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Avatar, Button, Card, Title, Paragraph, IconButton } from "react-native-paper";
import { SvgXml } from "react-native-svg"
import star from "../../../../assets/star"
import open from "../../../../assets/open"
// import { Icon } from "react-native-vector-icons/icon";

// const TitleContent = styled(Text).attrs can also add attributes properties
const TitleContent = styled(Text)`
padding:16px 0;
  color: ${props => props.theme.colors.ui.primary};
  font-family:${props => props.theme.fonts.heading};
  font-size:${props => props.theme.fontSizes.h5}
`;

const AddressContent = styled(Text)`
padding-top:6px;
  color: ${props => props.theme.colors.ui.primary};
  font-family:${props => props.theme.fonts.monospace};
  font-size:${props => props.theme.fontSizes.body};
  letter-spacing:0.5px
`;
// const RestaurantCard = styled(Card)`
// color: red;
// `

const RestaurantInfoComponent = ({ restaurant }) => {
    const {
        name = "Meer's Restaurant",
        icon,
        photos = [
            "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
        ],
        address = "16 Revanagar soc, Adajan Gam, Suart",
        isOpenNow = true,
        rating = 4,
        isClosedTemporarily = false,
    } = restaurant;


    const ratingArray = Array.from(new Array(Math.floor(restaurant.rating)))
    // console.log("ratingArray", ratingArray);

    return (
        <View style={styles.outerView}>
            <Card elevation={5} style={styles.cardOuter}>
                {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
                <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                <Card.Content>
                    <TitleContent>{name}</TitleContent>
                    <View style={styles.section}>

                        <View style={styles.row}>

                            {ratingArray.map((item, index) => {
                                return <SvgXml key={index} xml={star} height={20} width={20} />
                            })}
                        </View>
                        <View style={styles.row}>
                            {isOpenNow && <SvgXml xml={open} height={20} width={20} />}
                            {/* <SvgXml xml={open} height={20} width={20} /> */}
                        </View>
                    </View>
                    <AddressContent>{restaurant.vicinity}</AddressContent>
                </Card.Content>
                {/* <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions> */}
            </Card>
        </View>
    );
};

export default RestaurantInfoComponent;

const styles = StyleSheet.create({
    cardOuter: {
        padding: 15,
    },
    outerView: {
        marginVertical: 10
    },
    row: {
        flexDirection: "row"
    },
    section: {
        flex: 1,
        border: "1px solid black",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});
