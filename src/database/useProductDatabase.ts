import { useSQLiteContext } from "expo-sqlite";
import { IProduct } from "../constants/interface";

export function useProductDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<IProduct, "id">) {
    const statemant = await database.prepareAsync(
      "INSERT INTO products(name, price, photo) values($name, $price, $photo)"
      )
    try {
      const result = await statemant.executeAsync({
        $name: data.name,
        $price: data.price, 
        $photo: data.photo
      })
      const insertedRow = result.lastInsertRowId.toLocaleString()
      return { insertedRow }
    } catch (error) {
      throw error
    } finally {
      statemant.finalizeAsync()
    }
  }

  async function update(data: IProduct) {
    const statemant = await database.prepareAsync(
      "UPDATE products SET name=$name, price=$price, photo=$photo WHERE(id=$id)"
      )
    try {
      await statemant.executeAsync({
        $id: data.id,
        $name: data.name,
        $price: data.price,
        $photo: data.photo
      })
    } catch (error) {
      throw error
    } finally {
      statemant.finalizeAsync()
    }
  }

  async function remove(id: Number) {
    try {
      await database.execAsync("DELETE FROM products WHERE id="+ id)
    } catch (error) {
      throw error
    }
  }

  async function list() {
    try {
      const query = "SELECT * FROM products ORDER BY name"
      const response = await database.getAllAsync<IProduct>(query)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async function searchById(id: number) {
    try {
      const query = "SELECT * FROM products where id="
      const response = await database.getAllAsync<IProduct>(query, id)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async function findByName(name: string) {
    try {
      const query = "SELECT * FROM products WHERE name="
      const response = await database.getFirstAsync<IProduct>(query, name)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async function searchByName(name: string) {
    try {
      const query = "SELECT * FROM products LIKE "
      const response = await database.getAllAsync<IProduct>(query, `%${name}%`)
      return response
    } catch (error) {
      console.log(error)
    }
  }
  
  return { create, update, remove, list, searchById, findByName, searchByName }
}