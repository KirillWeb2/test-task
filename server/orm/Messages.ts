import { MysqlError, Pool, PoolConfig, createPool } from "mysql";
import dotenv from "dotenv";

import {
  CreateMessageType,
  MessageType,
  MessagesFindAllType,
  MessagesQueryType,
  MessagesSortType,
  MessagesSplitPageType,
} from "../types/message.js";

dotenv.config();

export class Messages {
  pool: Pool;

  messages: MessageType[] = [];

  isNext: boolean = true;

  constructor(config: string | PoolConfig) {
    this.pool = createPool(config);
  }

  query({ sql, args }: MessagesQueryType) {
    return new Promise<any | MysqlError>((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(sql, args, (err, rows) => {
          connection.release();

          if (err) return reject(err);

          resolve(rows);
        });
      });
    });
  }

  async findAll({
    page,
    sort_field,
    sort_type,
    tableName,
  }: MessagesFindAllType) {
    this.messages = (await this.query({
      sql: `SELECT * FROM ${tableName}`,
    })) as MessageType[];

    if (sort_field && sort_type) {
      this.sort({
        field: sort_field,
        type: sort_type,
      });
    }

    this.splitPage({ page });
  }

  async create(tableName: string, data: CreateMessageType) {
    const result = await this.query({
      sql: `INSERT INTO ${tableName} SET ?`,
      args: [{ ...data }],
    });
    return result;
  }

  splitPage({ page }: MessagesSplitPageType) {
    const startIndex = (page - 1) * 25;
    const endIndex = page * 25;

    // проверка, можно ли продолжать дальше
    if (this.messages.slice(endIndex, endIndex + 1).length === 0) {
      this.isNext = false;
    } else {
      this.isNext = true;
    }

    this.messages = this.messages.slice(startIndex, endIndex);
  }

  sort({ field, type }: MessagesSortType) {
    if (!field || !type) return;

    if (field === "date") {
      this.messages.sort(
        (a, b) =>
          +type * (new Date(a.date).getTime() - new Date(b.date).getTime())
      );
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
