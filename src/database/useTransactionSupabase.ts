import { supabase } from "./supabase";

export function useTransactionSupabase() {

  async function list() {
    try {
      const response = await supabase
        .from('transactions')
        .select('id, CASE WHEN modality="buy" THEN place WHEN modality="sale" THEN client_name END AS name, price, amount, modality, datetransaction ')
        .eq('ispaid', true)  
        .order('datetransaction', {ascending: false})
      return response
    } catch (error) {
      throw error
    }
  }

  async function listGraphic() {
    try {
      const query = "SELECT modality, SUM(price) as total_price FROM transactions WHERE ispaid=true GROUP BY modality ORDER BY modality, datetransaction"
      const response = await supabase
      .from('transactions')
      .select('modality, SUM(price) as total_price')
      .order('modality', {ascending: true})
      .order('datetransaction', {ascending: true})
      return response
    } catch (error) {
      throw error
    }
  }
  
  return { list, listGraphic }
}