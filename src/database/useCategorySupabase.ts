import { supabase } from "./supabase";
import { ICategory } from "../constants/interface";

export function useCategorySupabase() {

  async function create(data: Omit<ICategory, "id">) {
    try {
      const insertedRow = await supabase
      .from('categories')
      .insert({
        category: data.category,
      })
      return { insertedRow }
    } catch (error) {
      throw error
    }
  }

  async function update(data: ICategory) {
    try {
      await supabase
      .from('categories')
      .update({
        category: data.category,
      })
      .eq('id', data.id)
    } catch (error) {
      throw error
    }
  }

  async function remove(id: Number) {
    try {
      await supabase.from('categories').delete().eq('id', id)
    } catch (error) {
      throw error
    }
  }

  async function list() {
    try {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('category', {ascending: true})
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function searchById(id: number) {
    try {
      const { data } = await supabase.from('categories').select('*').eq('id', id)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function findByName(category: string) {
    try {
      const { data } = await supabase.from('categories').select('*').eq('category', category)
      return data 
    } catch (error) {
      console.log(error)
    }
  }

  async function searchByName(category: string) {
    try {
      const { data } = await supabase.from('categories').select('*').like('category', category)
      return data
    } catch (error) {
      console.log(error)
    }
  }
  
  return { create, update, remove, list, searchById, findByName, searchByName }
}