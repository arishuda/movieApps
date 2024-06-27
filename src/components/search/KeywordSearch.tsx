import { API_ACCESS_TOKEN } from "@env";
import { useState } from "react";
import { View, Text, TextInput, FlatList, Dimensions } from "react-native";
import { Movie } from "../../types/app";
import MovieItem from "../movies/MovieItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const win = Dimensions.get("window");
export default function KeywordSearch() {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showIcon, setShowIcon] = useState(true);
  const getMovieDetail = (): void => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}`;
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
        setMovies(response.results);
      })
      .catch((errorResponse) => {
        console.log(errorResponse);
      });
  };
  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 999,
          marginVertical: 10,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            paddingRight: 40, 
          }}
          placeholder="Input title movie here"
          onSubmitEditing={() => {
            getMovieDetail();
          }}
          onChangeText={(text) => {
            setKeyword(text);
          }}
          // onFocus={() => setShowIcon(false)} 
          onBlur={() => setShowIcon(true)} 
          value={keyword} 
        />
        {showIcon && (
          <Feather
            name="search"
            size={20}
            style={{
              position: "absolute",
              right: 10, 
            }}
          />
        )}
      </View>
      <FlatList
        style={{
          marginTop: 20,
          marginBottom: 350,
          width: win.width,
        }}
        contentContainerStyle={{
          alignItems: "center",
        }}
        data={movies}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <MovieItem
              movie={item}
              size={{
                width: 100,
                height: 160,
              }}
              coverType={"poster"}
            />
          </View>
        )}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}