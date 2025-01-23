import { type SQLiteDatabase } from 'expo-sqlite';

export async function initializeDatabase(database: SQLiteDatabase) {
  // await database.execAsync(`DROP TABLE IF EXISTS products`)
  // await database.execAsync(`DROP TABLE IF EXISTS transactions`)
  // await database.execAsync(`DROP TABLE IF EXISTS orders`)

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT,
      name TEXT NOT NULL,
      price DOUBLE,
      photo TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP 
    )`)

  await database.execAsync(`
    CREATE TRIGGER IF NOT EXISTS set_updated_at
    AFTER UPDATE ON products
    FOR EACH ROW
    BEGIN
      UPDATE products
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = OLD.id;
  END`)
    
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      modality TEXT,
      kind TEXT,
      place TEXT,
      product_name TEXT,
      client_name TEXT,
      amount INTEGER,
      price DOUBLE,
      datetransaction TEXT,
      ispaid BOOLEAN,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP 
    )`)

    await database.execAsync(`
      CREATE TRIGGER IF NOT EXISTS set_updated_at
      AFTER UPDATE ON transactions
      FOR EACH ROW
      BEGIN
        UPDATE transactions
        SET updated_at = CURRENT_TIMESTAMP
        WHERE id = OLD.id;
    END`)

    await database.execAsync(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_name TEXT,
      phone_client TEXT,
      product_name TEXT,
      amount INTEGER,
      price DOUBLE,
      isdelivery BOOLEAN,
      deliveryfee DOUBLE,
      address TEXT,
      obs TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP 
    )`)

    await database.execAsync(`
      CREATE TRIGGER IF NOT EXISTS set_updated_at
      AFTER UPDATE ON orders
      FOR EACH ROW
      BEGIN
        UPDATE orders
        SET updated_at = CURRENT_TIMESTAMP
        WHERE id = OLD.id;
    END`)

}