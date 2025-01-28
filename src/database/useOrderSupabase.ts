import { supabase } from "./supabase";
import { IOrder } from "../constants/interface";

export function useOrderSupabase() {

  async function create(data: Omit<IOrder, 'id'>) {
    try {
      const insertedRow = await supabase
      .from('orders')
      .insert({
        client_name: data.client_name, 
        product_name: data.product_name, 
        amount: data.amount, 
        price: data.price, 
        isdelivery: data.isdelivery, 
        deliveryfee: data.deliveryfee, 
        address: data.address, 
        obs: data.obs,
        order_data: data.order_data,
        delivered: data.delivered
      })
      return { insertedRow }
    } catch (error) {
      throw error
    }
  }

  async function update(data: IOrder) {
    try {
      await supabase
      .from('orders')
      .update({
        client_name: data.client_name, 
        product_name: data.product_name, 
        amount: data.amount, 
        price: data.price, 
        isdelivery: data.isdelivery, 
        deliveryfee: data.deliveryfee, 
        address: data.address, 
        obs: data.obs,
        order_data: data.order_data,
        delivered: data.delivered
      })
      .eq('id', data.id)
    } catch (error) {
      throw error
    }
  }

  async function remove(id: number) {
    try {
      await supabase.from('orders').delete().eq('id', id)
    } catch (error) {
      throw error
    }
  }
  
  async function list() {
    try {
      const { data } = await supabase.from('orders').select('*')
      return data
    } catch (error) {
      throw error
    }
  }
  
  async function searchById(id: number) {
    try {
      const { data } = await supabase.from('orders').select('*').eq('id', id)
      return data
    } catch (error) {
      throw error
    }
  }
  
  async function searchByName(clientname: string) {
    try {
      const { data } = await supabase.from('orders').select('*').like('client_name', clientname)
      return data
    } catch (error) {
      throw error
    }
  }

  return { create, update, remove, list, searchById, searchByName }
}