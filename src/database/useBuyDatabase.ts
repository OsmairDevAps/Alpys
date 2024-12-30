import { useSQLiteContext } from "expo-sqlite";
import { ITBuy } from "../constants/interface";

export function useBuyDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<ITBuy, 'id'>) {
    const statemant = await database.prepareAsync(
      "INSERT INTO transactions(place, kind, product_name, amount, price, datetransaction) VALUES($place, $kind, $product_name, $amount, $price, $datetransaction)"
    )
    try {
      const result = await statemant.executeAsync({
        $place: data.place, 
        $kind: data.kind, 
        $product_name: data.product_name, 
        $amount: data.amount, 
        $price: data.price, 
        $datetransaction: data.datetransaction
      })
      const insertedRow = result.lastInsertRowId.toLocaleString()
      return { insertedRow }
    } catch (error) {
      throw error
    } finally{
      statemant.finalizeAsync()
    }
  }

  async function update(data: ITBuy) {
    const statemant = await database.prepareAsync(
      "UPDATE transactions SET place=$place, kind=$kind, product_name=$product_name, amount=$amount, price=$price, datetransaction=$datetransaction WHERE id=$id"
    )
    try {
      const result = await statemant.executeAsync({
        $id: data.id,
        $place: data.place, 
        $kind: data.kind, 
        $product_name: data.product_name, 
        $amount: data.amount, 
        $price: data.price, 
        $datetransaction: data.datetransaction
      })
      const insertedRow = result.lastInsertRowId.toLocaleString()
      return { insertedRow }
    } catch (error) {
      throw error
    } finally{
      statemant.finalizeAsync()
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync('DELETE FROM transactions WHERE id='+ id)
    } catch (error) {
      throw error
    }
  }
  
  async function list() {
    try {
      const query = "SELECT * FROM transactions ORDER BY name"
      const response = await database.getAllAsync<ITBuy>(query)
      return response
    } catch (error) {
      throw error
    }
  }
  
  async function searchById(id: number) {
    try {
      const query = "SELECT * FROM transactions WHERE id="
      const response = await database.getAllAsync<ITBuy>(query, id)
      return response
    } catch (error) {
      throw error
    }
  }
  
  async function searchByPeriod(dtini: string, dtfin: string) {
    try {
      const query = `SELECT * FROM transactions WHERE datetransaction between ${dtini} and ${dtfin}`
      const response = await database.getAllAsync<ITBuy>(query)
      return response
    } catch (error) {
      throw error
    }
  }

  return { create, update, remove, list, searchById, searchByPeriod }
}