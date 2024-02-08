import * as SQLite from "expo-sqlite";
import React, { createContext } from "react";
import { TaskDatabase } from "../db/TaskDatabase";

type DatabaseContextProps = {
  db: SQLite.SQLiteDatabase;
  taskDb: TaskDatabase;
  fetchData: React.Dispatch<React.SetStateAction<boolean>>;
  isDataFetched: boolean;
};

export const DatabaseContext = createContext<DatabaseContextProps>(
  {} as DatabaseContextProps,
);
