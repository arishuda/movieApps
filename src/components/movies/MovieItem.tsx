import {
    ImageBackground,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
  import { MovieItemProps } from "../../types/app";
  import { FontAwesome } from "@expo/vector-icons";
  import { LinearGradient } from "expo-linear-gradient";
  import { StackActions, useNavigation } from "@react-navigation/native";
  
  function MovieItem({ movie, size, coverType }: MovieItemProps): JSX.Element {
    const navigation = useNavigation();
    const pushAction = StackActions.push("movieDetail", { id: movie.id });
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(pushAction);
        }}
      >
        <ImageBackground
          resizeMode="cover"
          style={[size, styles.backgroundImage]}
          imageStyle={styles.backgroundImageStyle}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${
              coverType === "backdrop" ? movie.backdrop_path : movie.poster_path
            }`,
          }}
        >
          <LinearGradient
            colors={["#00000000", "rgba(0, 0, 0, 0.7)"]}
            locations={[0.6, 0.8]}
            style={styles.gradientStyle}
          >
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="yellow" />
              <Text style={styles.rating}>{movie.vote_average}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    backgroundImage: {
      marginRight: 4,
    },
    backgroundImageStyle: {
      borderRadius: 8,
    },
    movieTitle: {
      color: "white",
    },
    gradientStyle: {
      padding: 8,
      height: "100%",
      width: "100%",
      borderRadius: 8,
      display: "flex",
      justifyContent: "flex-end",
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
    },
    rating: {
      color: "yellow",
      fontWeight: "700",
    },
  });
  
  export default MovieItem;