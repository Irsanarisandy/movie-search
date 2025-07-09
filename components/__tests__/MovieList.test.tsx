import { render } from "@testing-library/react-native";

import { MovieList } from "../MovieList";

describe("MovieList component", () => {
  test("renders correctly when loading", () => {
    const movieListComp = render(<MovieList loading={true} movieList={[]} />);
    const { getByAccessibilityHint } = movieListComp;

    getByAccessibilityHint("loading");
  });

  test("renders correctly when loaded", () => {
    const fakeData = {
      title: "Homo Erectus",
      year: 1800,
      imdb_id: "tt0000000",
      rank: 0,
      actors: "Darth Erectus",
      img_poster: "test.jpg",
      photo_width: 305,
      photo_height: 475,
    };
    const movieListComp = render(<MovieList loading={false} movieList={[fakeData]} />);
    const { getByAccessibilityHint, getByText } = movieListComp;

    const img = getByAccessibilityHint("movie image");
    expect(img.props.source.uri).toBe(fakeData.img_poster);
    getByText(fakeData.title);
    getByText(fakeData.year.toString());
    getByText(fakeData.actors);
    getByText(`IMDB Rank: ${fakeData.rank}`);
  });
});
