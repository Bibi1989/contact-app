import connect, {sql} from '@databases/pg'

const db = connect()

async function authenticate() {
    return db.query(sql`SELECT 1 + 1 AS result`)
}

export { db, sql, authenticate }