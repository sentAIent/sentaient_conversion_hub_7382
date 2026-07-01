const fs = require('fs');
const { Client } = require('pg');

async function run() {
  const sql = fs.readFileSync('migrate.sql', 'utf8');
  
  const client = new Client({
    connectionString: "postgres://postgres:postgres@localhost:51214/postgres?sslmode=disable",
  });
  
  await client.connect();
  console.log("Connected to DB");
  
  try {
    await client.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
    console.log("Dropped schema");
    await client.query(sql);
    console.log("Migration successful");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}

run().catch(console.error);
