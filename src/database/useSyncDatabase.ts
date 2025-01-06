import { useSQLiteContext } from "expo-sqlite";
import { supabase } from './supabase'

export function useSyncDatabase() {
  const database = useSQLiteContext()

  async function syncDatabase() {
  }
}