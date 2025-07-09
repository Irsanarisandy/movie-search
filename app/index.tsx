import { Entypo } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { MovieList } from "components/MovieList";
import { SearchBar } from "components/SearchBar";
import { SearchMovieItemType, searchMovies } from "utils/moviesApi";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState<SearchMovieItemType[]>([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const insets = useSafeAreaInsets();

  const searchPressed = async (typed: boolean) => {
    if (typed) {
      setMovieData([]);
      setLoading(true);
      const result = await searchMovies(searchPhrase);
      if (result != null) setMovieData(result);
      setLoading(false);
    }
  };

  const emptyData = useMemo(() => movieData.length === 0, [movieData]);

  return (
    <>
      <Stack.Screen options={{ title: "Movie Search" }} />
      <SafeAreaView className={styles.container} edges={["bottom", "left", "right"]}>
        <SearchBar
          searchPhrase={searchPhrase}
          searchPressed={searchPressed}
          setSearchPhrase={setSearchPhrase}
        />
        <MovieList loading={loading} movieList={movieData} />
        <View
          style={{
            position: "absolute",
            bottom: insets.bottom,
            right: insets.right + 20,
          }}
        >
          <TouchableOpacity disabled={emptyData} onPress={() => setMovieData([])}>
            <View
              className={styles.clearBtn}
              style={{
                height: 70,
                width: 70,
              }}
            >
              <Entypo color={emptyData ? "gray" : "black"} name="trash" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = {
  container: "flex-1 items-center px-5 pt-5",
  clearBtn: "bg-white border-2 border-neutral-300 items-center justify-center rounded-full",
};
