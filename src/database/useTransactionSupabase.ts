import { supabase } from "./supabase";

export function useTransactionSupabase() {

  async function list() {
    try {
      const { data } = await supabase.rpc('get_transaction_list');
      return data
    } catch (error) {
      throw error
    }
  }

  async function listGraphic() {
    try {
      const { data } = await supabase.rpc('get_transactions_summary');
      return data
    } catch (error) {
      throw error
    }
  }
  
  return { list, listGraphic }
}