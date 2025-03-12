import { supabase } from "./supabase";
import { IClient } from "../constants/interface";

export function useClientSupabase() {

  async function create(data: Omit<IClient, "id">) {
    try {
      const insertedRow = await supabase
      .from('clients')
      .insert({
        name: data.name,
      })
      return { insertedRow }
    } catch (error) {
      throw error
    }
  }

  async function update(data: IClient) {
    try {
      await supabase
      .from('clients')
      .update({
        name: data.name,
      })
      .eq('id', data.id)
    } catch (error) {
      throw error
    }
  }

  async function remove(id: Number) {
    try {
      await supabase.from('clients').delete().eq('id', id)
    } catch (error) {
      throw error
    }
  }

  async function list() {
    try {
      const { data } = await supabase
        .from('clients')
        .select('*')
        .order('name', {ascending: true})
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function searchById(id: number) {
    try {
      const { data } = await supabase.from('clients').select('*').eq('id', id)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function findByName(name: string) {
    try {
      const { data } = await supabase.from('clients').select('*').eq('name', name)
      return data 
    } catch (error) {
      console.log(error)
    }
  }

  async function searchByName(search: string) {
    try {
      const { data } = await supabase.from('clients').select('*').like('name', search)
      return data
    } catch (error) {
      console.log(error)
    }
  }
  
  return { create, update, remove, list, searchById, findByName, searchByName }
}