import { SQLiteProvider } from 'expo-sqlite'
import { Stack } from 'expo-router';
import { initializeDatabase } from '../database/initializeDatabase';
import '../styles/global.css'

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName='alpys.db' onInit={initializeDatabase}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}