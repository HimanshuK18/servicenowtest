import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    host: 'testdb.cpyeqgbgayph.ap-northeast-1.rds.amazonaws.com',
    database: 'testdb',
    password: 'Nissan183#',
    port: 5432, // default PostgreSQL port
});

async function Connect() {
    try {
        await client.connect();
        const res = await client.query('SELECT * FROM users');
        console.log(res.rows);
        await client.end();
    }
    catch (Error) {
        console.log(Error);

    }

}
export default Connect;