import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import FAB from "./components/FAB";
import TasksPage from "./components/TasksPage";
import { DatabaseContext } from "./context";
import { TaskDatabase } from "./db/TaskDatabase";
const db = SQLite.openDatabase("mydb.db");

export default () => {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists tasks (id integer primary key autoincrement, title string, completed integer)",
      );
    });

    return () => {
      db.closeAsync();
    };
  }, []);

  const taskDb = new TaskDatabase(db);

  const [isDataFetched, fetchData] = useState<boolean>(true);

  return (
    <>
      <StatusBar style="light" />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={eva.dark}
      >
        <DatabaseContext.Provider
          value={{ db, taskDb, isDataFetched, fetchData }}
        >
          <View style={styles.container}>
            <TasksPage />
            <FAB />
          </View>
        </DatabaseContext.Provider>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
