import { supabase } from "./supabase"

export function useProductTypeSupabase() {
  async function list() {
    try {
      const { data } = await supabase
        .from('product_types')
        .select('*')
        .order('kind', {ascending: true})
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return { list }
}