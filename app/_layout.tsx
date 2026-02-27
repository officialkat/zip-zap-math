import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name={"index"} options={{headerShown: false}}/>
    <Stack.Screen name={"addition-settings"} options={{headerShown: false}}/>
    <Stack.Screen name={"addition-game"} options={{headerShown: false}}/>
    <Stack.Screen name={"flash-multiply-settings"} options={{headerShown: false}}/>
    <Stack.Screen name={"flash-multiply-game"} options={{headerShown: false}}/>
    <Stack.Screen name={"wako-table-settings"} options={{headerShown: false}}/>
    <Stack.Screen name={"wako-table-game"} options={{headerShown: false}}/>
    <Stack.Screen name={"stats"} options={{headerShown: false}}/>
  </Stack>;
}
