import Database from "better-sqlite3";

export const db = new Database("src/db/db.sqlite", { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0
  )
`);
