import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite'
import { initializeDatabase } from '../database/initializeDatabase';
import { FinanceProvider } from './contexts/transactionContext';
import '../styles/global.css'

export default function RootLayout() {
  return (
    <FinanceProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </FinanceProvider>
  );
}