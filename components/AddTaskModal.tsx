import { Button, Input, Modal } from "@ui-kitten/components";
import React, { useContext, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { DatabaseContext } from "../context";

type Props = {
  visible: boolean;
  setVisible: any;
};

export default function AddTaskModal(props: Props) {
  const { taskDb, fetchData, isDataFetched } = useContext(DatabaseContext);
  const [inputTitleValue, setInputTitleValue] = useState("");

  const addTask = async (title: string) => {
    const result = await taskDb.create({ title });

    if (result) {
      fetchData((prev) => !prev);
      setInputTitleValue("");
      props.setVisible(false)
    } else {
      throw new Error("Failed.");
    }
  };

  return (
    <Modal
      visible={props.visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => props.setVisible((prev) => !prev)}
    >
      <View style={styles.modalWindow}>
        <Input
          placeholder="Input task"
          value={inputTitleValue}
          onChangeText={(nextValue) => {
            setInputTitleValue(nextValue);
          }}
        />

        <Button
          onPress={() => {
            addTask(inputTitleValue);
          }}
        >
          Add Task
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWindow: {
    width: Dimensions.get("window").width / 1.2,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
