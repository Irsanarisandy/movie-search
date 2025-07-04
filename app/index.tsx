import { Stack } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function App() {
  return (
    <>
      <Stack.Screen options={{ title: "Welcome" }} />
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-2xl">Blank Expo app</Text>
      </SafeAreaView>
    </>
  );
}
