import { Tabs } from "expo-router";

export default function MainLayout() {
  //Try out native tabs later
  return (
    <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="index"  />
        <Tabs.Screen name="Feed" />
    </Tabs>
  )
}