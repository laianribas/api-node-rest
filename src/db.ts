import { Pool } from "pg";

const connectionString = process.env.DATABASE

const db = new Pool({ connectionString })

export default db