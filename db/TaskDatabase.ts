import * as SQLite from "expo-sqlite";
import { Task } from "../types";

export class TaskDatabase {
  db;
  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  create = async ({ title }: { title: string }) =>
    new Promise<boolean>((resolve, reject) =>
      this.db.transaction((tx) => {
        tx.executeSql(
          "insert into tasks (title, completed) values (?, ?)",
          [title, 0],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve(true);
            } else {
              reject(false);
            }
          },
        );
      }),
    );

  /** if **id** is undefined -> returns all tasks */
  get = async ({ id }: { id?: number }) =>
    new Promise<Task[]>((resolve) =>
      this.db.transaction((tx) => {
        tx.executeSql("select * from tasks", [], (_, { rows }) => {
          resolve(rows._array);
        });
      }),
    );

  /** Provide **id** and one or many fields to update */
  update = ({
    id,
    title,
    completed,
  }: {
    id: number;
    title?: string;
    completed?: boolean;
  }): Task => {
    return {} as Task;
  };

  delete = ({ id }: { id: number }) =>
    new Promise<boolean>((resolve, reject) =>
      this.db.transaction((tx) => {
        tx.executeSql(
          "delete from tasks where id = (?)",
          [id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve(true);
            } else {
              reject(false);
            }
          },
        );
      }),
    );
}
