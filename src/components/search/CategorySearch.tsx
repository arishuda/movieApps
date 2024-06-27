import { API_ACCESS_TOKEN } from "@env";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Genre, GenreElement } from "../../types/app";
import { StackActions, useNavigation } from "@react-navigation/native";

const win = Dimensions.get("window");
export default function CategorySearch() {
  const [genres, setGenres] = useState<Genre>();
  const [selectedGenre, setSelectedGenre] = useState<GenreElement>();

  const navigation = useNavigation();
  const pushAction = StackActions.push("genre", {
    id: selectedGenre?.id,
    name: selectedGenre?.name,
  });

  const getGenres = (): void => {
    const url = `https://api.themoviedb.org/3/genre/movie/list`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setGenres(response);
      })
      .catch((errorResponse) => {
        console.log(errorResponse);
      });
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <SafeAreaView style={{ alignItems: "center"  }}>
      <TouchableOpacity
        onPress={() => {
          if (selectedGenre != undefined) {
            navigation.dispatch(pushAction);
          }
        }}
      >
        <View 
          style={{
            width: win.width - 40,
            backgroundColor: "#3d85c6",
            padding: 15,
            margin: 10,
            borderRadius: 999,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Search</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        style={{ marginBottom: 200, width: win.width - 40 }}
        data={genres?.genres}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedGenre(item);
            }}
          >
            <View
              style={{
                width: win.width / 2 - 40,
                backgroundColor:
                  item.id === selectedGenre?.id ? "#3d85c6" : "#bcbcbc",
                padding: 20,
                margin: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
              key={item.id}
            >
              <Text style={{ color: "black" }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </SafeAreaView>
  );
}