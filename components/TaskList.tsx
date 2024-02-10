import { Button, Input, List, ListItem, Modal } from "@ui-kitten/components";
import { useContext, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { DatabaseContext } from "../context";
import { Task } from "../types";
import { CheckIcon, TrashIcon, UncheckIcon } from "./icons";

type Props = {
  tasks: Task[];
};

type RenderItem = {
  item: Task;
  index: number;
};

export default ({ tasks }: Props) => {
  const [currTaskId, setCurrTaskId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [inputModalValue, setInputModalValue] = useState<string>();
  const { taskDb, fetchData } = useContext(DatabaseContext);

  const renderItem = ({ item }: RenderItem) => (
    <ListItem
      title={`${item.title}`}
      accessoryRight={() => deleteButton(item.id)}
      accessoryLeft={() => toggleTaskButton(item.id, item.completed)}
      onPress={() => openModal(item.id)}
    />
  );

  const updateTitle = (id: number, newTitle: string) => {
    taskDb.setTitleById({ id, title: newTitle });
    fetchData((prev) => !prev);
    setInputModalValue("");
    setShowModal(false);
  };

  const deleteButton = (id: number) => {
    return (
      <Button
        onPress={async () => {
          await taskDb.delete({ id });
          fetchData((prev) => !prev);
        }}
        accessoryLeft={TrashIcon}
        status="danger"
      />
    );
  };

  const openModal = (id: number) => {
    setCurrTaskId(id);
    setShowModal(true);
  };

  const toggleTaskButton = (id: number, completed: boolean) => {
    return (
      <Button
        onPress={() => {
          taskDb.setCompletedById({ id, completed: !completed });
          fetchData((prev) => !prev);
        }}
        accessoryLeft={completed ? CheckIcon : UncheckIcon}
        status="success"
      />
    );
  };

  return (
    <View>
      <Modal
        visible={showModal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setShowModal((prev) => !prev)}
      >
        <View style={styles.modalWindow}>
          <Input
            placeholder="Input task"
            value={inputModalValue}
            onChangeText={(nextValue) => {
              setInputModalValue(nextValue);
            }}
          />

          <Button
            onPress={() => {
              updateTitle(currTaskId || 0, inputModalValue || "");
            }}
          >
            Update title
          </Button>
        </View>
      </Modal>

      <List
        data={tasks}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalWindow: {
    width: Dimensions.get("window").width / 1.2,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
