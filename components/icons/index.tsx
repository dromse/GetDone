import { Icon, IconElement } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export const AddIcon = (): IconElement => (
  <Icon
    style={styles.icon}
    fill="white"
    name="plus-outline"
  />
);

export const TrashIcon = (): IconElement => (
  <Icon
    style={styles.icon}
    fill="white"
    name="trash-outline"
  />
);

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});
