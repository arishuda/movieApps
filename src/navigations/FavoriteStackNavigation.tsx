import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import MovieDetail from "../screens/MovieDetail";
import Favorite from "../screens/Favorite";

const Stack = createNativeStackNavigator();

function FavoriteStackNavigation(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="fav">
      <Stack.Screen
        name="fav"
        component={Favorite}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="movieDetail"
        component={MovieDetail}
        options={{ headerBackVisible: true, headerTitle: "Detail" }}
      />
    </Stack.Navigator>
  );
}

export default FavoriteStackNavigation;