import { router } from "expo-router";
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from "react-native";

import { SearchMovieItemType } from "utils/moviesApi";

interface MovieListType {
  loading: boolean;
  movieList: SearchMovieItemType[];
}

const Divider = () => <View className={styles.divider} style={{ height: 2 }} />;

const RenderItem = ({ item }: { item: SearchMovieItemType }) => (
  <Pressable
    onPress={() =>
      router.navigate({
        pathname: "/[movieId]",
        params: { movieId: item.imdb_id },
      })
    }
  >
    <View className={styles.movieContainer}>
      <Image
        className={styles.movieImg}
        source={{ uri: item.img_poster }}
        style={{ height: 140, width: 100 }}
      />
      <View className={styles.movieContent}>
        <Text className={styles.movieTitle} numberOfLines={2}>
          {item.title}
        </Text>
        {item.year != null && <Text className={styles.movieDesc}>{item.year}</Text>}
        {item.actors !== "" && (
          <Text className={styles.movieDesc} numberOfLines={2}>
            {item.actors}
          </Text>
        )}
        <Text className={styles.movieDesc}>IMDB Rank: {item.rank}</Text>
      </View>
    </View>
  </Pressable>
);

export const MovieList = ({ loading, movieList }: MovieListType) => {
  return (
    <View className={styles.container}>
      <FlatList
        keyExtractor={(item) => item.imdb_id}
        data={movieList}
        renderItem={RenderItem}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={loading ? <ActivityIndicator size="large" /> : undefined}
      />
    </View>
  );
};

const styles = {
  divider: "my-2",
  container: "flex-1 mt-5 w-full",
  movieContainer: "border-2 border-neutral-400 flex-row p-3 rounded-xl",
  movieImg: "mr-3 rounded-xl",
  movieContent: "flex-1",
  movieTitle: "font-bold text-xl",
  movieDesc: "text-neutral-700",
};
