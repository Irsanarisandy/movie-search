import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getMovieDetails, MovieDetailsType } from "utils/moviesApi";
import { checkPlural, renderSymbols, translateDuration } from "utils/stringUtil";

export default function MovieDetailsScreen() {
  const { movieId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [movieData, setMovieData] = useState<MovieDetailsType>();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const result = await getMovieDetails(movieId as string);
    if (result != null) setMovieData(result);
    setLoading(false);
  }, [movieId]);

  const onRefresh = () => {
    setRefreshing(true);
    setMovieData(undefined);
    fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const duration = useMemo(() => {
    const imdbDuration = movieData?.duration;
    if (imdbDuration == null) return;
    return translateDuration(imdbDuration);
  }, [movieData?.duration]);

  return (
    <>
      <Stack.Screen options={{ title: movieData?.name || "Movie Detail" }} />
      <SafeAreaView className={styles.container} edges={["bottom", "left", "right"]}>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {loading && <ActivityIndicator accessibilityHint="loading" size="large" />}
          {movieData != null && (
            <View className={styles.movieData}>
              <Text className={styles.movieName}>{movieData.name}</Text>
              {(movieData.image != null || movieData.description != null) && (
                <View className={styles.rowDetail}>
                  {movieData.image != null && (
                    <Image
                      accessibilityHint="movie image"
                      className={styles.movieImg}
                      source={{ uri: movieData.image }}
                      style={{ height: 160, width: 110 }}
                    />
                  )}
                  {movieData.description != null && (
                    <View className={styles.movieDesc}>
                      <Text className={styles.label}>Description:</Text>
                      <Text>{movieData.description}</Text>
                    </View>
                  )}
                </View>
              )}
              {duration != null && (
                <View className={styles.rowDetail}>
                  <Text className={styles.label}>Duration:</Text>
                  <Text>{duration}</Text>
                </View>
              )}
              {movieData.datePublished != null && (
                <View className={styles.rowDetail}>
                  <Text className={styles.label}>Date published:</Text>
                  <Text>{movieData.datePublished.toDateString()}</Text>
                </View>
              )}
              {movieData.aggregateRating != null && (
                <View className={styles.rowDetail}>
                  <Text className={styles.label}>Overall rating:</Text>
                  <Text>{movieData.aggregateRating.ratingValue}/10 stars</Text>
                </View>
              )}
              {movieData.contentRating != null && (
                <View className={styles.rowDetail}>
                  <Text className={styles.label}>Content rating:</Text>
                  <Text>{movieData.contentRating}</Text>
                </View>
              )}
              {movieData.genre != null && movieData.genre.length > 0 && (
                <View className={styles.rowDetail}>
                  <Text className={styles.label}>Genre:</Text>
                  <Text>{movieData.genre.join(", ").toLowerCase()}</Text>
                </View>
              )}
              {movieData.actor != null && movieData.actor.length > 0 && (
                <View>
                  <Text className={styles.label}>Actor{checkPlural(movieData.actor)}:</Text>
                  {movieData.actor.map((person) => (
                    <Text key={person.url}>&bull; {renderSymbols(person.name)}</Text>
                  ))}
                </View>
              )}
              {movieData.director != null && movieData.director.length > 0 && (
                <View>
                  <Text className={styles.label}>Director{checkPlural(movieData.director)}:</Text>
                  {movieData.director.map((person) => (
                    <Text key={person.url}>&bull; {renderSymbols(person.name)}</Text>
                  ))}
                </View>
              )}
              {movieData.creator != null && movieData.creator.length > 0 && (
                <View>
                  <Text className={styles.label}>Creator{checkPlural(movieData.creator)}:</Text>
                  {movieData.creator.map((person) => (
                    <Text key={person.url}>&bull; {renderSymbols(person.name)}</Text>
                  ))}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = {
  container: "flex-1 px-5 pt-5",
  movieData: "gap-4",
  movieName: "text-xl font-bold",
  movieImg: "mr-3 rounded-xl",
  movieDesc: "flex-1",
  label: "font-bold",
  rowDetail: "flex-row gap-1",
};
