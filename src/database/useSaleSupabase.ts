import { supabase } from "./supabase";
import { ITSale } from "../constants/interface";

export function useSaleSupabase() {

  async function create(data: Omit<ITSale, 'id'>) {
    try {
      const insertedRow = await supabase.from('transactions')
      .insert({
        product_name: data.product_name, 
        client_name: data.client_name, 
        modality: data.modality,
        amount: data.amount, 
        price: data.price, 
        datetransaction: data.datetransaction, 
        ispaid: data.ispaid
      })
      return { insertedRow }
    } catch (error) {
      throw error
    }
  }

  async function update(data: ITSale) {
    try {
      await supabase.from('transactions').update({
        product_name: data.product_name, 
        client_name: data.client_name, 
        amount: data.amount, 
        price: data.price, 
        datetransaction: data.datetransaction, 
        ispaid: data.ispaid
      })
      .eq('id', data.id)
    } catch (error) {
      throw error
    } 
  }

  async function remove(id: number) {
    try {
      await supabase.from('transactions').delete().eq('id', id)
    } catch (error) {
      throw error
    }
  }
  
  async function list() {
    try {
      const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('modality', 'sale')
      .order('created_at', {ascending: false})
      return data
    } catch (error) {
      throw error
    }
  }
  
  async function listPagination(from: number, to: number) {
    try {
      const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('modality', 'sale')
      .range(from, to)
      .order('created_at', {ascending: false})
      return data
    } catch (error) {
      throw error
    }
  }
  
  async function searchById(id: number) {
    try {
      const { data, error } = await supabase.from('transactions').select('*').eq('id', id)
      if (error) {
        console.log(error)
      }
      if (data) {
        return data[0]
      }
    } catch (error) {
      throw error
    }
  }
  
  async function searchByPeriod(dtini: string, dtfin: string) {
    try {
      const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('modality', 'sale')
      .rangeAdjacent('datetransaction', `[${dtini}, ${dtfin}]`)
      return data
    } catch (error) {
      throw error
    }
  }

  async function listClientsNotPaid() {
    try {
      const { data, error } = await supabase.rpc('get_clients_not_paid')
      if(error) {
        console.log(error)
      }
      return data 
    } catch (error) {
      throw error
    }
  }

  async function listResumeClients(nameClient: string) {
    try {
      const { data } = await supabase
      .from('transactions')
      .select('id, client_name, product_name, datetransaction, amount, price')
      .eq('client_name', nameClient)
      .order('client_name', {ascending: true})
      return data
    } catch (error) {
      throw error
    }
  }

  return { create, update, remove, list, listPagination, searchById, searchByPeriod, listClientsNotPaid, listResumeClients }
}