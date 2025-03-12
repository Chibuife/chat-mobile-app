import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ChatProvider } from '@/helperFn/RegisterContextApi';



export default function ChatLayout() {
  const colorScheme = useColorScheme();

  return (
    <ChatProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="findPeople" options={{ headerShown: false }} />
          <Stack.Screen name="friends" options={{ headerShown: false }} />
          <Stack.Screen name="[id]" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" /> 
      </ThemeProvider>
    </ChatProvider>

  );
}
