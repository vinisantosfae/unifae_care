import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'unifae_care.db';
const DATABASE_VERSION = 2;

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME);
  }

  return databasePromise;
}

export async function initDatabase(): Promise<void> {
  const db = await getDatabase();
  const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version;');
  const currentVersion = result?.user_version ?? 0;

  if (currentVersion < DATABASE_VERSION) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      DROP TABLE IF EXISTS usuarios;
      CREATE TABLE usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha_hash TEXT NOT NULL,
        tipo_usuario TEXT NOT NULL CHECK(tipo_usuario IN ('patient', 'physiotherapist', 'student')),
        ra TEXT UNIQUE,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      PRAGMA user_version = ${DATABASE_VERSION};
    `);

    return;
  }

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha_hash TEXT NOT NULL,
      tipo_usuario TEXT NOT NULL CHECK(tipo_usuario IN ('patient', 'physiotherapist', 'student')),
      ra TEXT UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
