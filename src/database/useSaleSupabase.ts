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
      const response = await supabase
      .from('transactions')
      .select('*')
      .eq('modality', 'sale')
      return response
    } catch (error) {
      throw error
    }
  }
  
  async function searchById(id: number) {
    try {
      const response = await supabase.from('transactions').select('*').eq('id', id)
      return response
    } catch (error) {
      throw error
    }
  }
  
  async function searchByPeriod(dtini: string, dtfin: string) {
    try {
      const response = await supabase
      .from('transactions')
      .select('*')
      .eq('modality', 'sale')
      .rangeAdjacent('datetransaction', `[${dtini}, ${dtfin}]`)
      return response
    } catch (error) {
      throw error
    }
  }

  return { create, update, remove, list, searchById, searchByPeriod }
}