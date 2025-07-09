export interface SearchMovieItemType {
  title: string;
  year?: number;
  imdb_id: string;
  rank: number;
  actors: string;
  img_poster: string;
  photo_width: number;
  photo_height: number;
}

export const searchMovies = async (searchQuery: string) => {
  try {
    const response = await fetch(`https://imdb.iamidiotareyoutoo.com/search?q=${searchQuery}`);
    const json = await response.json();
    if (json.error_code === 200 && json.description != null && Array.isArray(json.description))
      return json.description.map((movie: Record<string, any>) => ({
        title: movie["#TITLE"],
        year: movie["#YEAR"],
        imdb_id: movie["#IMDB_ID"],
        rank: movie["#RANK"],
        actors: movie["#ACTORS"],
        img_poster: movie["#IMG_POSTER"],
        photo_width: movie.photo_width,
        photo_height: movie.photo_height,
      })) as SearchMovieItemType[];
    console.error(json);
  } catch (error) {
    console.error(error);
  }
};
