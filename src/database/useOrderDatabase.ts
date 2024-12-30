import { useSQLiteContext } from "expo-sqlite";
import { IOrder } from "../constants/interface";

export function useOrderDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<IOrder, 'id'>) {
    const statemant = await database.prepareAsync(
      "INSERT INTO orders(client_name, product_name, amount, price, isdelivery, deliveryfee, address, obs) VALUES($client_name, $product_name, $amount, $price, $isdelivery, $deliveryfee, $address, $obs)"
    )
    try {
      const result = await statemant.executeAsync({
        $client_name: data.client_name, 
        $product_name: data.product_name, 
        $amount: data.amount, 
        $price: data.price, 
        $isdelivery: data.isdelivery, 
        $deliveryfee: data.deliveryfee, 
        $address: data.address, 
        $obs: data.obs  
      })
      const insertedRow = result.lastInsertRowId.toLocaleString()
      return { insertedRow }
    } catch (error) {
      throw error
    } finally{
      statemant.finalizeAsync()
    }
  }

  async function update(data: IOrder) {
    const statemant = await database.prepareAsync(
      "UPDATE orders SET client_name=$client_name, product_name=$product_name, amount=$amount, price=$price, isdelivery=$isdelivery, deliveryfee=$deliveryfee, address=$address, obs=$obs WHERE id=$id"
    )
    try {
      const result = await statemant.executeAsync({
        $client_name: data.client_name, 
        $product_name: data.product_name, 
        $amount: data.amount, 
        $price: data.price, 
        $isdelivery: data.isdelivery, 
        $deliveryfee: data.deliveryfee, 
        $address: data.address, 
        $obs: data.obs  
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
      await database.execAsync('DELETE FROM orders WHERE id='+ id)
    } catch (error) {
      throw error
    }
  }
  
  async function list() {
    try {
      const query = "SELECT * FROM orders ORDER BY client_name, product_name"
      const response = await database.getAllAsync<IOrder>(query)
      return response
    } catch (error) {
      throw error
    }
  }
  
  async function searchById(id: number) {
    try {
      const query = "SELECT * FROM orders WHERE id="
      const response = await database.getAllAsync<IOrder>(query, id)
      return response
    } catch (error) {
      throw error
    }
  }
  
  async function searchByName(clientname: string) {
    try {
      const query = "SELECT * FROM orders WHERE client_name LIKE "
      const response = await database.getAllAsync<IOrder>(query, `%${clientname}%`)
      return response
    } catch (error) {
      throw error
    }
  }

  return { create, update, remove, list, searchById, searchByName }
}