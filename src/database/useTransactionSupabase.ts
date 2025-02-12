import { supabase } from "./supabase";

export function useTransactionSupabase() {
  async function listGraphic() {
    try {
      const { data } = await supabase.rpc('get_transactions_summary');
      return data
    } catch (error) {
      throw error
    }
  }

  async function list() {
    try {
      const { data } = await supabase.rpc('get_transaction_list');
      return data
    } catch (error) {
      throw error
    }
  }
  
  async function listResume(dtIni: string, dtFim: string) {
    try {
      const { data } = await supabase
        .from('resumed_transactions')
        .select('*')
        .gte('datetransaction', dtIni)
        .lte('datetransaction', dtFim)
      return data
    } catch (error) {
      throw error
    }
  }
  
  async function listTransactions(dtIni: string, dtFim: string) {
    try {
      const { data } = await supabase
        .from('formatted_transactions')
        .select('*')
        .gte('datetransaction', dtIni)
        .lte('datetransaction', dtFim)
        .order('datetransaction', { ascending: false });
      return data
    } catch (error) {
      throw error
    }
  }
  
  return { listResume, listTransactions }
}