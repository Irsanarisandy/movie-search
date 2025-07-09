import { Entypo, Feather } from "@expo/vector-icons";
import { useMemo } from "react";
import { Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarType {
  searchPhrase: string;
  searchPressed: (typed: boolean) => void;
  setSearchPhrase: (phrase: string) => void;
}

export const SearchBar = ({ searchPhrase, searchPressed, setSearchPhrase }: SearchBarType) => {
  const btnPressed = (typed: boolean) => {
    Keyboard.dismiss();
    searchPressed(typed);
  };

  const emptySearch = useMemo(() => searchPhrase === "", [searchPhrase]);

  return (
    <View className={styles.container}>
      <View className={styles.searchBar}>
        <Feather className={styles.iconSearch} color="gray" name="search" size={20} />
        <TextInput
          className={styles.input}
          placeholder="Movie name"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
        />
        {!emptySearch && (
          <Entypo
            className={styles.iconCross}
            color="black"
            name="cross"
            size={20}
            onPress={() => {
              setSearchPhrase("");
              btnPressed(false);
            }}
          />
        )}
      </View>
      <TouchableOpacity
        className={styles.searchPress}
        disabled={emptySearch}
        onPress={() => btnPressed(true)}
      >
        <Text
          className={searchPhrase !== "" ? styles.searchPressText : styles.searchPressDisabledText}
        >
          Search
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: "flex-row items-center w-full",
  iconCross: "p-2",
  iconSearch: "ml-1 mr-2",
  input: "flex-1 text-xl",
  searchBar: "bg-[#D9DBDA] flex-1 flex-row items-center p-2 rounded-2xl w-full",
  searchPress: "ml-4",
  searchPressText: "font-bold text-[#007AFF] text-xl",
  searchPressDisabledText: "font-bold text-neutral-400 text-xl",
};
