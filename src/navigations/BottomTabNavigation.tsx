import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Favorite from "../screens/Favorite";
import HomeStackNavigation from "./HomeStackNavigation";
import FavoriteStackNavigation from "./FavoriteStackNavigation";
import SearchStackNavigation from "./SearchStackNavigation";

const Tab = createBottomTabNavigator();

function BottomTabNavigator(): JSX.Element {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteStackNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="heart" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;