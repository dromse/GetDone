import { Layout, Text } from "@ui-kitten/components";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { DatabaseContext } from "../context";
import { Task } from "../types";
import TaskList from "./TaskList";

export default function TasksPage() {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const { taskDb, fetchData, isDataFetched } = useContext(DatabaseContext);

  useEffect(() => {
    taskDb.get({}).then((tasks) => {
      setTaskList(tasks);
      console.log(tasks);
    });
  }, [isDataFetched]);

  return (
    <Layout style={styles.container}>
      {taskList.length > 0 ? (
        <Layout style={styles.layout}>
          <TaskList tasks={taskList} />
        </Layout>
      ) : (
        <Layout style={styles.empty}>
          <Text style={{ fontSize: 30 }}>Task List is empty!</Text>
          <Text>Click '+' button to create new task</Text>
        </Layout>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingTop: 25,
  },
  container: {
    flex: 1,
    maxHeight: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty__font: {
    fontSize: 36,
  },
});
