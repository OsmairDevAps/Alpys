import { useSQLiteContext } from "expo-sqlite";
import { GraphicProps, IDataTransaction } from "../constants/interface";

export function useTransactionDatabase() {
  const database = useSQLiteContext()

  async function list() {
    try {
      const query = "SELECT id, CASE WHEN modality='buy' THEN place WHEN modality='sale' THEN client_name END AS name, price, amount, modality, datetransaction FROM transactions ORDER BY datetransaction DESC"
      const response = await database.getAllAsync<IDataTransaction>(query)
      return response
    } catch (error) {
      throw error
    }
  }

  async function listGraphic() {
    try {
      const query = "SELECT datetransaction, price FROM transactions GROUP BY datetransaction, price ORDER BY datetransaction"
      const response = await database.getAllAsync<GraphicProps>(query)
      return response
    } catch (error) {
      throw error
    }
  }
  
  return { list, listGraphic }
}