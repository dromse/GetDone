import { Button, Input, Layout } from "@ui-kitten/components";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { DatabaseContext } from "../context";
import { Task } from "../types";
import TaskList from "./TaskList";
import { AddIcon } from "./icons";

export default function TasksPage() {
  //const [updateTaskList, setUpdateTaskList] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);

  const { taskDb, fetchData, isDataFetched } = useContext(DatabaseContext);

  const addTask = async (title: string) => {
    const result = await taskDb.create({ title });

    if (result) {
      fetchData((prev) => !prev);
      setInputValue("");
    } else {
      throw new Error("Failed.");
    }
  };

  useEffect(() => {
    taskDb.get({}).then((data) => setTaskList(data));
  }, [isDataFetched]);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.layout}>
        <TaskList tasks={taskList} />
      </Layout>

      <Layout>
        <Input
          placeholder="Input task"
          value={inputValue}
          onChangeText={(nextValue) => {
            setInputValue(nextValue);
          }}
        />

        <Button
          onPress={() => addTask(inputValue)}
          accessoryLeft={AddIcon}
        >
          Add Task
        </Button>
      </Layout>
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
});
