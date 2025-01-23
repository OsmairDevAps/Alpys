import { SQLiteProvider } from 'expo-sqlite'
import { Stack } from 'expo-router';
import { initializeDatabase } from '../database/initializeDatabase';
import { FinanceProvider } from '../contexts/transactionContext';
import '../styles/global.css'

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName='alpys.db' onInit={initializeDatabase}>
      <FinanceProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </FinanceProvider>
    </SQLiteProvider>
  );
}