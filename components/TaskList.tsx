import { Button, List, ListItem } from "@ui-kitten/components";
import { useContext } from "react";
import { View } from "react-native";
import { DatabaseContext } from "../context";
import { Task } from "../types";
import { TrashIcon } from "./icons";

type Props = {
  tasks: Task[];
};

type RenderItem = {
  item: Task;
  index: number;
};

export default ({ tasks }: Props) => (
  <List
    data={tasks}
    renderItem={renderItem}
  />
);

const renderItem = ({ item, index }: RenderItem) => (
  <View>
    <ListItem
      title={`${item.title} ${index + 1}`}
      accessoryRight={() => deleteButton(item.id)}
    />
  </View>
);

const deleteButton = (id: number) => {
  const { taskDb, fetchData } = useContext(DatabaseContext);

  return (
    <Button
      onPress={async () => {
        await taskDb.delete({ id });
        fetchData((prev) => !prev);
      }}
      accessoryLeft={TrashIcon}
      status="danger"
    ></Button>
  );
};
