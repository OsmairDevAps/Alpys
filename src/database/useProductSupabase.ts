import { supabase } from "./supabase";
import { IProduct } from "../constants/interface";

export function useProductSupabase() {

  async function create(data: Omit<IProduct, "id">) {
    try {
      const insertedRow = await supabase
      .from('products')
      .insert({
        name: data.name,
        price: data.price, 
        photo: data.photo
      })
      return { insertedRow }
    } catch (error) {
      throw error
    }
  }

  async function update(data: IProduct) {
    try {
      await supabase
      .from('products')
      .update({
        name: data.name,
        price: data.price,
        photo: data.photo
      })
      .eq('id', data.id)
    } catch (error) {
      throw error
    }
  }

  async function remove(id: Number) {
    try {
      await supabase.from('products').delete().eq('id', id)
    } catch (error) {
      throw error
    }
  }

  async function list() {
    try {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('name', {ascending: true})
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function searchById(id: number) {
    try {
      const { data } = await supabase.from('products').select('*').eq('id', id)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function findByName(name: string) {
    try {
      const { data } = await supabase.from('products').select('*').eq('name', name)
      return data 
    } catch (error) {
      console.log(error)
    }
  }

  async function searchByName(name: string) {
    try {
      const { data } = await supabase.from('products').select('*').like('name', name)
      return data
    } catch (error) {
      console.log(error)
    }
  }
  
  return { create, update, remove, list, searchById, findByName, searchByName }
}