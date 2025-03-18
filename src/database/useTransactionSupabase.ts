import { supabase } from "./supabase";

export function useTransactionSupabase() {
  
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
        .limit(10)
        .order('datetransaction', { ascending: false });
      return data
    } catch (error) {
      throw error
    }
  }
  
  async function listDebtPerCustomer(nameClient: string) {
    try {
      const { data } = await supabase
      .from('transactions')
      .select('.')
      .eq('cient_name', nameClient)
    } catch (error) {
      throw error
    }
  }

  return { listResume, listTransactions }
}