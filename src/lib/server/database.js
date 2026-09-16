// MySQL Connection Pool
import mysql from 'mysql2/promise';
import {
    DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
} from '$env/static/private';
 
// Connection Pool erstellen — wiederverwendbare DB-Verbindungen
const pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD
});
 
export default pool;
 