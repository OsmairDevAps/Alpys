import { type SQLiteDatabase } from 'expo-sqlite';

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price DOUBLE,
      photo TEXT
    )`)
    
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )`)

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      modality TEXT
      kind TEXT
      place TEXT
      product_name TEXT
      client_name TEXT
      amount INTEGER
      price DOUBLE
      datetransaction TEXT
      ispaid BOOLEAN
      name TEXT NOT NULL
    )`)

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_name TEXT,
      product_name TEXT,
      amount INTEGER,
      price DOUBLE,
      isdelivery BOOLEAN,
      deliveryfee DOUBLE,
      address TEXT,
      obs TEXT
    )`)

}