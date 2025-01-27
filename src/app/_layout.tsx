import { Stack } from 'expo-router';
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