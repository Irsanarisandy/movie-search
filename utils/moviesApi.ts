import { renderSymbols } from "./stringUtil";

interface AggregateRating {
  ratingCount: number;
  bestRating: number;
  worstRating: number;
  ratingValue: number;
}

interface Person {
  url: string;
  name: string;
}

export interface MovieDetailsType {
  name: string;
  image?: string;
  description?: string;
  aggregateRating?: AggregateRating;
  contentRating?: string;
  genre?: string[];
  datePublished?: Date;
  actor?: Person[];
  director?: Person[];
  creator?: Person[];
  duration?: string;
}

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

export const getMovieDetails = async (movieId: string) => {
  try {
    const response = await fetch(`https://imdb.iamidiotareyoutoo.com/search?tt=${movieId}`);
    const json = await response.json();
    if (
      json.error_code === 200 &&
      json.short != null &&
      !Array.isArray(json.short) &&
      typeof json.short === "object"
    ) {
      const movie = json.short;
      const name = renderSymbols(movie.alternateName || movie.name);
      const description = movie.description != null ? renderSymbols(movie.description) : undefined;
      const datePublished = movie.datePublished != null ? new Date(movie.datePublished) : undefined;
      return {
        name,
        image: movie.image,
        description,
        aggregateRating: movie.aggregateRating,
        contentRating: movie.contentRating,
        genre: movie.genre,
        datePublished,
        actor: movie.actor?.filter((person: any) => person["@type"] === "Person"),
        director: movie.director?.filter((person: any) => person["@type"] === "Person"),
        creator: movie.creator?.filter((person: any) => person["@type"] === "Person"),
        duration: movie.duration,
      } as MovieDetailsType;
    }
    console.error(json);
  } catch (error) {
    console.error(error);
  }
};

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
