import { useSQLiteContext } from "expo-sqlite";
import { ITSale } from "../constants/interface";

export function useSaleDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<ITSale, 'id'>) {
    const statemant = await database.prepareAsync(
      "INSERT INTO transactions(product_name, client_name, modality, amount, price, datetransaction, ispaid) VALUES($product_name, $client_name, $modality, $amount, $price, $datetransaction, $ispaid)"
    )
    try {
      const result = await statemant.executeAsync({
        $product_name: data.product_name, 
        $client_name: data.client_name, 
        $modality: data.modality,
        $amount: data.amount, 
        $price: data.price, 
        $datetransaction: data.datetransaction, 
        $ispaid: data.ispaid
      })
      const insertedRow = result.lastInsertRowId.toLocaleString()
      return { insertedRow }
    } catch (error) {
      throw error
    } finally{
      statemant.finalizeAsync()
    }
  }

  async function update(data: ITSale) {
    const statemant = await database.prepareAsync(
      "UPDATE transactions SET place=$place, kind=$kind, product_name=$product_name, amount=$amount, price=$price, datetransaction=$datetransaction WHERE id=$id"
    )
    try {
      const result = await statemant.executeAsync({
        $id: data.id,
        $product_name: data.product_name, 
        $client_name: data.client_name, 
        $amount: data.amount, 
        $price: data.price, 
        $datetransaction: data.datetransaction, 
        $ispaid: data.ispaid
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
      const query = "SELECT * FROM transactions WHERE modality='sale' ORDER BY datetransaction"
      const response = await database.getAllAsync<ITSale>(query)
      return response
    } catch (error) {
      throw error
    }
  }
  
  async function searchById(id: number) {
    try {
      const query = "SELECT * FROM transactions WHERE id="
      const response = await database.getAllAsync<ITSale>(query, id)
      return response
    } catch (error) {
      throw error
    }
  }
  
  async function searchByPeriod(dtini: string, dtfin: string) {
    try {
      const query = `SELECT * FROM transactions WHERE modality='sale' AND datetransaction between ${dtini} and ${dtfin}`
      const response = await database.getAllAsync<ITSale>(query)
      return response
    } catch (error) {
      throw error
    }
  }

  return { create, update, remove, list, searchById, searchByPeriod }
}