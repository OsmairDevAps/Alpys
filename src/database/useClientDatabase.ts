import { useSQLiteContext } from "expo-sqlite";
import { IClient } from "../constants/interface";

export function useClientDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<IClient, 'id'>) {
    const statemant = await database.prepareAsync("INSERT INTO clients(name) VALUES($name)")
    try {
      const result = await statemant.executeAsync({ $name: data.name })
      const insertedRow = result.lastInsertRowId.toLocaleString()
      return { insertedRow }
    } catch (error) {
      throw error
    } finally{
      statemant.finalizeAsync()
    }
  }

  async function update(data: IClient) {
    const statemant = await database.prepareAsync("UPDATE clients SET name=$name WHERE id=$id")
    try {
      const result = await statemant.executeAsync({ $name: data.name })
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
      await database.execAsync('DELETE FROM clients WHERE id='+ id)
    } catch (error) {
      throw error
    }
  }
  
  async function list() {
    try {
      const query = "SELECT * FROM clients ORDER BY name"
      const response = await database.getAllAsync<IClient>(query)
      return response
    } catch (error) {
      throw error
    }
  }
  
  async function searchById(id: number) {
    try {
      const query = "SELECT * FROM clients WHERE id="
      const response = await database.getAllAsync<IClient>(query, id)
      return response
    } catch (error) {
      throw error
    }
  }
  
  async function searchByName(name: string) {
    try {
      const query = "SELECT * FROM clients WHERE name LIKE "
      const response = await database.getAllAsync<IClient>(query, `%${name}%`)
      return response
    } catch (error) {
      throw error
    }
  }

  return { create, update, remove, list, searchById, searchByName }
}