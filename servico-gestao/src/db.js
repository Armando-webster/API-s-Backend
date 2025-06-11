import mysql from 'mysql2/promise';

export async function query({ query, values = [] }) {
    const connection = await mysql.createConnection({
        host: 'sql10.freesqldatabase.com',
        port: 3306,
        database: 'sql10782691',
        user: 'sql10782691',
        password: 'A8umIc4mrq',
    });
    try {
        const [results] = await connection.execute(query, values);
        connection.end();
        return results;
    } catch(error) {
        throw Error(error.message);
    }
}