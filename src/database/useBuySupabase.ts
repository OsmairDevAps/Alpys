import { supabase } from "./supabase";
import { ITBuy } from "../constants/interface";

export function useBuySupabase() {

  async function create(data: Omit<ITBuy, 'id'>) {
    try {
      const insertedRow = await supabase
      .from('transactions')
      .insert({
        modality: data.modality,
        place: data.place, 
        kind: data.kind, 
        product_name: data.product_name, 
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

  async function update(data: ITBuy) {
    try {
      supabase.from('transactions')
      .update({
        place: data.place, 
        kind: data.kind, 
        product_name: data.product_name, 
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
        .eq('modality','buy')
      return data
    } catch (error) {
      throw error
    }
  }
  
  async function searchById(id: number) {
    try {
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', id)
      return data
    } catch (error) {
      throw error
    }
  }
  
  async function searchByPeriod(dtini: string, dtfin: string) {
    try {
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .eq('modality', 'buy')
        .rangeAdjacent('datetransaction', `[${dtini}, ${dtfin}]`)
      return data
    } catch (error) {
      throw error
    }
  }

  return { create, update, remove, list, searchById, searchByPeriod }
}