const express = require("express");
const { Client } = require("pg");

const app = express();
const PORT = 3000;

app.use(express.json());

const client = new Client({
  user: "postgres",       
  host: "localhost",
  database: "express-homework",
  password: "2001anfal1",
  port: 5432,
});


client.connect()
  .then(() => {
    console.log("✅ Connected to Postgres");

   
    return client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        price DECIMAL(10,2),
        stock INT
      )
    `);
  })
  .then(() => {
    console.log("✅ Table 'products' is ready");
  })
  .catch(err => console.error("❌ Error:", err));

app.get("/", (req, res) => {
  res.send("🚀 Server is running and connected to database!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});