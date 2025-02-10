import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';



export default function ChatLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        {/* <Stack.Screen name="edith" options={{ headerShown: false }} />
        <Stack.Screen name="setting" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="reset-password" options={{ headerShown: false }} /> */}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
