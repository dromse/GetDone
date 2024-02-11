import { Button, Tooltip } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AddTaskModal from "./AddTaskModal";
import { AddIcon } from "./icons";

export default function FAB() {
  const [toggleOverflowMenu, setToggleOverflowMenu] = useState<boolean>(false);
  const [AddTaskModalVisible, setAddTaskModalVisible] = useState(false);

  const renderFAB = () => {
    return (
      <Button
        onPress={() => setToggleOverflowMenu((prev) => !prev)}
        style={styles.circle}
      >
        <AddIcon />
      </Button>
    );
  };

  const openAddTaskModal = () => {
    setAddTaskModalVisible(true);
    setToggleOverflowMenu(false);
  };

  return (
    <>
      <AddTaskModal
        visible={AddTaskModalVisible}
        setVisible={setAddTaskModalVisible}
      />
      <Tooltip
        anchor={renderFAB}
        visible={toggleOverflowMenu}
        onBackdropPress={() => setToggleOverflowMenu(false)}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        placement={"top"}
      >
        <View style={styles.tooltip}>
          <Button
            style={{ marginBottom: 10 }}
            onPress={openAddTaskModal}
          >
            Create Task
          </Button>
          <Button style={{ marginBottom: 10 }}>Create Counter Task</Button>
          <Button>Show Archived Tasks</Button>
        </View>
      </Tooltip>
    </>
  );
}

const styles = StyleSheet.create({
  tooltip: {},
  circle: {
    backgroundColor: "#3366ff",
    width: 70,
    height: 70,
    position: "absolute",
    zIndex: 100,
    right: 10,
    bottom: 10,
    borderRadius: 100,
  },
});
