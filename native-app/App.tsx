import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/query";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Text>Hello world</Text>
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
