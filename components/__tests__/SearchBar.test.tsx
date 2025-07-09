import { fireEvent, render, waitFor } from "@testing-library/react-native";

import { SearchBar } from "../SearchBar";

describe("SearchBar component", () => {
  test("renders correctly", async () => {
    const searchPressed = jest.fn();
    const setSearchPhrase = jest.fn();
    let searchBar: any;
    await waitFor(() => {
      searchBar = render(
        <SearchBar
          searchPhrase="d"
          searchPressed={searchPressed}
          setSearchPhrase={setSearchPhrase}
        />
      );
    });
    const { getByPlaceholderText, getByText } = searchBar;

    const inputElement = getByPlaceholderText("Movie name");
    const searchBtn = getByText("Search");

    fireEvent.changeText(inputElement, "ab");
    expect(setSearchPhrase).toHaveBeenCalledTimes(1);

    fireEvent.press(searchBtn);
    expect(searchPressed).toHaveBeenCalledTimes(1);
  });
});
