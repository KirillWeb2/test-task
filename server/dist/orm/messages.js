import { createPool } from "mysql";
import dotenv from "dotenv";
dotenv.config();
export class Messages {
    pool;
    messages = [];
    isNext = true;
    constructor(config) {
        this.pool = createPool(config);
    }
    query({ sql, args }) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err)
                    return reject(err);
                connection.query(sql, args, (err, rows) => {
                    connection.release();
                    if (err)
                        return reject(err);
                    resolve(rows);
                });
            });
        });
    }
    async findAll({ page, sort_field, sort_type, tableName, }) {
        this.messages = (await this.query({
            sql: `SELECT * FROM ${tableName}`,
        }));
        if (sort_field && sort_type) {
            this.sort({
                field: sort_field,
                type: sort_type,
            });
        }
        this.splitPage({ page });
    }
    async create(tableName, data) {
        const result = await this.query({
            sql: `INSERT INTO ${tableName} SET ?`,
            args: [{ ...data }],
        });
        return result;
    }
    splitPage({ page }) {
        const startIndex = (page - 1) * 25;
        const endIndex = page * 25;
        // проверка, можно ли продолжать дальше
        if (this.messages.slice(endIndex, endIndex + 1).length === 0) {
            this.isNext = false;
        }
        else {
            this.isNext = true;
        }
        this.messages = this.messages.slice(startIndex, endIndex);
    }
    sort({ field, type }) {
        if (!field || !type)
            return;
        if (field === "date") {
            this.messages.sort((a, b) => +type * (new Date(a.date).getTime() - new Date(b.date).getTime()));
            return;
        }
        this.messages.sort((a, b) => {
            if (a[field] < b[field]) {
                return -+type;
            }
            if (a[field] > b[field]) {
                return +type;
            }
            return 0;
        });
    }
}
export const MessagesORM = new Messages({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
